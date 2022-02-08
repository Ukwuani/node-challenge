import { Client } from 'pg';
import config from 'config';
import { EntityType } from '../types';
import { Connection, createConnection, getConnection } from 'typeorm';
import { static } from 'express';

export default class Db {
  static connection = null;
  static existingConnections = {}

  static connect() {
    if (!Db.connection) {
      const db = new Client(config.db);
      Db.connection = db.connect();
    }
  }

  static connectTypeOrm(entity?: EntityType) {
    if (!Db.existingConnections[entity.tag]) {
      Db.existingConnections[entity.tag] = createConnection({
        name: entity.tag,
        type: 'postgres',
        username: config.db.user,
        entities: [entity],
        ...config.db,
      });
    }
    return Db.existingConnections[entity.tag];
  }

  static async query(queryString: string, parameters?: any) {
    if (!Db.connection) await Db.connect();

    return Db.connection.query(queryString, parameters);
  }

  static getEntityRepository(entity) {
    return Db.connectTypeOrm(entity).then(
      (response) => response.getRepository(entity)
    );
  }
}
