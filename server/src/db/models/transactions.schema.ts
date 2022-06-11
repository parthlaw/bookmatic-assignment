import { Sequelize, DataTypes } from 'sequelize';
import { TransactionsInstance } from './@types/transactions';

const Transactions = (sequelize: Sequelize) => {
  const Transaction= sequelize.define<TransactionsInstance>('transaction', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    amount: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("paid","recieved"),
        allowNull: false,
    },
    partyName: {
        type: DataTypes.STRING,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
  });
  return Transaction;
};
export default Transactions;