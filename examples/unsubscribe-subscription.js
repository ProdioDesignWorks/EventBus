const EventBus = require('EventBus-Prodio');

const Bus = new EventBus({
  projectId: 'projectId',
  keyFilename: 'projectId-keyFile.json',
});


const subscriptionName = 'subscriptionName';
const autoAck = true;

const onMessage = (message) => {
  console.log('messageId:', message.id);
  console.log('data:', message.data);
  console.log('attributes:', message.attributes);
  console.log('publishTime:', message.publishTime);
};

Bus.subscribe({ subscriptionName, autoAck }, onMessage);

console.log(`isSubscribed to ${subscriptionName}:${Bus.isSubscribed(subscriptionName)}`);

// unsubscribe
Bus.unsubscribe(subscriptionName);
