import { PubSub } from '@google-cloud/pubsub';
import {
  isEmpty, isFn, isString,
} from './helper';

/**
  config format
  { projectId: 'project-f69d3', keyFilename: './project-admin-config.json' }
*/

export default class EventBus {
  constructor(config = {}) {
    if (isEmpty(config)) {
      throw new Error('config not provided');
    }

    const pubsub = new PubSub(config);
    this.pubsub = pubsub;
    this.subscriptions = {};
    this.topicName = '';
    this.subscriptionName = '';
    this.onMessage = this.onMessage.bind(this);
  }

  onMessage(message) {
    const msg = message;
    const {
      data: dt,
      attributes: attrs,
    } = msg;

    const stringifiedDt = dt.toString('utf8');
    const customAttributes = Object.keys(attrs).reduce((rs, attribute) => {
      try {
        return Object.assign({}, rs, {
          [attribute]: JSON.parse(attrs[attribute]),
        });
      } catch (error) {
        return Object.assign({}, rs, {
          [attribute]: attrs[attribute],
        });
      }
    }, {});

    msg.data = stringifiedDt;
    msg.attributes = customAttributes;

    if (this.subscriptions.autoAck) {
      const {
        attributes, data, id, publishTime,
      } = msg;
      this.subscriptions.fn({
        attributes, data, id, publishTime,
      });
      msg.ack();
    } else {
      this.subscriptions.fn(msg);
    }
  }

  subscribe({ subscriptionName = '', autoAck = false }, fn = null) {
    if (!subscriptionName.length) {
      throw new Error('subscriptionName cannot be null or empty');
    }

    if (!isFn(fn)) {
      throw new Error('callback cannot be null or empty');
    }

    if (!this.isSubscribed(subscriptionName)) {
      if (isEmpty(this.subscriptions)) {
        const subscription = this.pubsub.subscription(subscriptionName);
        this.subscriptions = { subscription, autoAck, fn };
        this.subscriptionName = subscriptionName;
        this.subscriptions.subscription.on('message', this.onMessage);
      } else {
        throw new Error(`Already subscribed to ${this.subscriptionName}. Instead create new instance.`);
      }
    }
  }

  unsubscribe(subscriptionName = '') {
    if (this.isSubscribed(subscriptionName)) {
      this.subscriptions.subscription.removeListener('message', this.onMessage);
      this.subscriptions = {};
      this.subscriptionName = '';
    }
  }

  async publish(topicName, data, attributes) {
    if (!isString(data)) {
      const dataBuffer = Buffer.from(JSON.stringify(data));
      const messageId = await this.pubsub.topic(topicName).publish(dataBuffer, attributes);
      return messageId;
    }
    const dataBuffer = Buffer.from(data);

    const customAttributes = Object.keys(attributes).reduce((rs, attribute) => {
      if (isString(attributes[attribute])) {
        return Object.assign({}, rs, {
          [attribute]: attributes[attribute],
        });
      }
      return Object.assign({}, rs, {
        [attribute]: JSON.stringify(attributes[attribute]),
      });
    }, {});

    const messageId = await this.pubsub.topic(topicName).publish(dataBuffer, customAttributes);
    return messageId;
  }

  isSubscribed(subscriptionName = '') {
    if (!subscriptionName.length) {
      throw new Error('subscriptionName cannot be null or empty');
    }

    return this.subscriptionName === subscriptionName;
  }
}
