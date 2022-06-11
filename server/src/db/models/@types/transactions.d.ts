import { Model, Optional } from 'sequelize';

declare enum TransactionType {
    paid = 'paid',
    recieved = 'recieved',
}
interface TransactionsAttributes {
    id: number;
    amount: string;
    type: TransactionType;
    partyName: string;
    user_id: number;
}
interface TransactionsInput extends Optional<TransactionsAttributes, 'id'> {}
interface TransactionsInstance extends Model<TransactionsAttributes, TransactionsInput>, TransactionsAttributes {
    createdAt?: Date;
    updatedAt?: Date;
}