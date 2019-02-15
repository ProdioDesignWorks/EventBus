const EventBus = require('EventBus-Prodio');

const Bus = new EventBus({
  projectId: 'projectId',
  keyFilename: 'projectId-keyFile.json',
});


const subscriptionName = 'subscriptionName';
const autoAck = false;

const onMessage = (message) => {
  console.log('messageId:', message.id);
  console.log('data:', message.data);
  console.log('attributes:', message.attributes);
  console.log('publishTime:', message.publishTime);

  // Your processing

  // This will delete msg from queue
  message.ack();
};

Bus.subscribe({ subscriptionName, autoAck }, onMessage);
