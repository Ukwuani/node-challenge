import config from 'config';
import { createConnection } from 'typeorm';
import { EntityType } from '../types';

export default class Db {
  static existingConnections = {}
  
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

  static getEntityRepository(entity) {
    return Db.connectTypeOrm(entity).then(
      (response) => response.getRepository(entity)
    );
  }
}
