const EventBus = require('EventBus-Prodio');

const Bus = new EventBus({
  projectId: 'projectId',
  keyFilename: 'projectId-keyFile.json',
});

const topicName = "topicName";
const message = "User registered";
const customAttributes = {
    serviceId: 'REGISTRATION-SERVICE',
    user: { 
        name: 'John Doe',
        email: 'johndoe@example.com'
    }
};

//async await 
const messageId = await Bus.publish(topicName, message, customAttributes);
