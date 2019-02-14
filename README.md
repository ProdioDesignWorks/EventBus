# EventBus

 [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**EventBus is a nodejs wrapper to communicate with Google Pub/Sub.** ✨

  - Simple API's to publish and subscribe,
  - etc.

# New Features!

  - You can publish message to any topic
  - Subscribe to any subscription ( For now, limited to only single subscription )


You can also:
  - Check subscription status
  - Unsubscribe with a single API
  - Create multiple instances of event bus

Goal

> Expose simple API's for communication with Google Pub/Sub

### Prerequisites
- Google Cloud account
- Google project with Pub/Sub enabled
[Click here for more details](https://cloud.google.com/nodejs/docs/reference/pubsub/0.23.x/)

### Installation

EventBus-Prodio requires [Node.js](https://nodejs.org/) v6+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ git clone https://github.com/ProdioDesignWorks/EventBus.git
$ cd EventBus
$ npm install
```

For production environments...

```sh
$ npm install EventBus-Prodio --save
```

### Plugins

EventBus-Prodio is extended with the following plugins. Instructions on how to use them in your own application are linked below.

| Plugin | README |
| ------ | ------ |
| Google PubSub | [PubSub GitHub][pubSubGitHub] |


### How to use

```
const EventBus = require('EventBus-Prodio');
// google config file
const Bus = new EventBus({ 
    projectId: 'projectId', 
    keyFilename: 'projectId-keyFile.json' 
});
```

For Subscribing to a subscription
```
const subscriptionName = "subscriptionName";
const autoAck = true;
//If autoAck is set, then message's are auto acknowledged as soon as message is received
//If autoAck is not set, then subscriber has to explicitly acknowledge the message

const onMessage = (message) => console.log(message);
Bus.subscribe({ subscriptionName, autoAck }, onMessage);
```

For Publishing message on topic
```
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
const messageId = await Bus.publish(topicName, msg, customAttributes);

//promise
Bus.publish(topicName, msg, customAttributes).then(
    messageId => console.log(messageId) 
).catch(
    error => console.error(error)
);
```
Please refer examples for more details

### Development

Want to contribute? Great!

EventBus-Prodio uses Babel + Eslint for fast developing.
Make a change in your file and instantanously see your updates!

Open your favorite Terminal and run these commands.


### Todos

 - Write MORE Tests
 - Add multiple subscriptions support
 - Create Topic & Subscription API's
 - Ordered events

License
----

MIT


**Free Software, Hell Yeah!**

[//]: # (These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax)


[pubSubGitHub]: <https://github.com/googleapis/nodejs-pubsub>
