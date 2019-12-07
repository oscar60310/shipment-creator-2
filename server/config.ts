import * as path from 'path';
import logger from './utils/logger';
import * as yaml from 'js-yaml';
import { merge } from 'lodash';
import { existsSync, readFileSync } from 'fs';

const configFolder =
  process.env.DATA_FOLDER || path.join(__dirname, '../', 'config');

logger.info(`Data folder: ${configFolder}`);

export interface IConfig {
  companyName: string;
  companyAddress: string;
  companyPhone: string;
  port: number;
  dbName: string;
  dbUser: string;
  dbPass: string;
  dbHost: string;
}

let config: IConfig = {
  companyName: 'Test Company',
  companyAddress: '',
  companyPhone: '',
  port: 3000,
  dbName: '',
  dbUser: '',
  dbPass: '',
  dbHost: 'localhost'
};

const configPath = path.join(configFolder, 'shipment-creator-2.yaml');

if (existsSync(configPath)) {
  const yamlString = readFileSync(configPath, 'utf-8');
  const userConfig = yaml.safeLoad(yamlString);
  config = merge(config, userConfig);
  logger.info('Load user config success');
}

export default config;
