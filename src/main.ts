import { connect } from 'mongoose';

import { app } from './app';
import { CONFIG } from './config';

const start = async (): Promise<void> => {
  await connect(CONFIG.db);
  await app.listen(CONFIG.port, '0.0.0.0');
};

start();
