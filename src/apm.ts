// src/apm.ts
import { Constants } from '@crosscutting/utils/Constants';
import apm from 'elastic-apm-node';

apm.start({
  serviceName: process.env.FUNCTION_NAME || Constants.PRAGMA,
  secretToken: process.env.SECRET_TOKEN_ELASTIC,
  serverUrl: process.env.SERVER_URL_ELASTIC,
  environment: process.env.ELASTIC_ENVIROMENT,
  active: true,
});

export default apm;
