const dotenv = require('dotenv');
const express = require('express');

const errorHandler = require('./src/errors/errorHandler');
const ErrStrategies = require('./src/errors/strategies');
const { logger } = require('./src/utils/logger');

dotenv.config({ silent: true });

const app = express();
const appErrorHandler = errorHandler([ErrStrategies.defaultStrategy]);
const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  req.getVersion = function validateVer() {
    return req.headers.accept.split('version=')[1];
  };
  next();
});

appErrorHandler(app);

app.listen(PORT, () => {
  logger.info(`Server listening on port: ${PORT}`);
});
