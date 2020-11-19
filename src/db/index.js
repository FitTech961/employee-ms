const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const { isEmpty } = require('lodash');

const { logger } = require('../utils/logger');

dotenv.config({ silent: true });

const { MONGODB_DATABASE, MONGODB_PWD } = process.env;

const uri = `mongodb+srv://fittech:${MONGODB_PWD}@fittech.xulsc.mongodb.net/${MONGODB_DATABASE}?retryWrites=true&w=majority`;

let client;

client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connect() {
  if (isEmpty(!client)) {
    try {
      client.connect((err) => {
        logger.info('Mongodb Connected Successfully');
        client = client.db(MONGODB_DATABASE);

        if (err) {
          logger.error('Problem connecting to mongo ', err);
        }
      });
    } catch (err) {
      logger.error(err.message);
    }
  }
}

function getClient() {
  return client;
}

function collection(name) {
  if (isEmpty(client)) {
    throw new Error('Could not connect to MongoDB');
  } else if (!isEmpty(client) && !client.serverConfig.isConnected()) {
    logger.error('MongoDB connection interrupted');
    throw new Error('MongoDB connection interrupted');
  }
  return client.collection(name);
}

module.exports = { collection, connect, getClient };
