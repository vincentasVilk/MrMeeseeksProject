import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

import { MrMeeseeksModel } from '../src/persistance/models/mr-meeseeks';
import { TaskModel } from '../src/persistance/models/task';
import { tasks } from './seed';

export const setupDBForTasks = (): void => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = await mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await TaskModel.create(tasks);
  });

  afterEach(async (): Promise<void> => {
    await TaskModel.deleteMany();
  });
};

export const setupDBForMeeseeks = (): void => {
  let mongod: MongoMemoryServer;

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
  });

  afterAll(async (): Promise<void> => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongod.stop();
  });

  beforeEach(async () => {
    await MrMeeseeksModel.create([]);
  });

  afterEach(async (): Promise<void> => {
    await TaskModel.deleteMany();
    await MrMeeseeksModel.deleteMany();
  });
};
