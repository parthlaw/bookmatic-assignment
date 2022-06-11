import { Sequelize } from 'sequelize';
import applyRelationships from './relationships';
import Transactions from './models/transactions.schema';
import User from './models/user.schema';

const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../../config.js')[env];

const sequelize = new Sequelize(process.env.SQL_URI)

export const user_model=User(sequelize);
export const transactions_model=Transactions(sequelize);
// applyRelationships(sequelize);
transactions_model.belongsTo(user_model,{foreignKey:'user_id'});
export default sequelize;
