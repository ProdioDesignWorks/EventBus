/**
	For now, you can've only one subscription per instance
	For cases, where you want to have multiple Subscribers for single subscription;
	you can create multiple instances of EventBus where pubsub will take care of load balancing between multiple subscribers
	Refer: https://cloud.google.com/pubsub/docs/subscriber
*/
const EventBus = require('EventBus-Prodio');

const Bus1 = new EventBus({
  projectId: 'projectId',
  keyFilename: 'projectId-keyFile.json',
});

const Bus2 = new EventBus({
  projectId: 'projectId',
  keyFilename: 'projectId-keyFile.json',
});


const subscriptionName = 'subscriptionName';
const autoAck = true;

const onMessage1 = (message) => {
  console.log('messageId:', message.id);
  console.log('data:', message.data);
  console.log('attributes:', message.attributes);
  console.log('publishTime:', message.publishTime);
};

const onMessage2 = (message) => {
  console.log('messageId:', message.id);
  console.log('data:', message.data);
  console.log('attributes:', message.attributes);
  console.log('publishTime:', message.publishTime);
};

Bus1.subscribe({ subscriptionName, autoAck }, onMessage1);

Bus1.subscribe({ subscriptionName, autoAck }, onMessage2);
