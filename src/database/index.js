import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import Meetup from '../app/models/Meetup';

const models = [User, Meetup];

class Database {
  constructor() {
    this.connection = new Sequelize(databaseConfig);

    this.init();
    this.associate();
  }

  init() {
    models.forEach(model => model.init(this.connection));
  }

  associate() {
    models.forEach(model => {
      if (model.associate) {
        model.associate(this.connection.models);
      }
    });
  }
}

export default new Database();
