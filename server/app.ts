import { app } from './utils/apollo-server';
import logger from './utils/logger';
import { connect } from './utils/db';

const port = process.env.PORT || 3000;
logger.info(`Env = ${process.env.NODE_ENV}`);

connect().then(() => {
  app.listen({ port }, () => {
    logger.info(`Server start listening at port ${port}`);
  });
});
