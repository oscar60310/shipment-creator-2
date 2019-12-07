import { startServer } from './utils/apollo-server';
import logger from './utils/logger';
import { connect } from './utils/db';
import config from './config';

const port = config.port;
logger.info(`Env = ${process.env.NODE_ENV}`);

connect()
  .then(startServer)
  .then(app => {
    app.listen({ port }, () => {
      logger.info(`Server start listening at port ${port}`);
    });
  });
