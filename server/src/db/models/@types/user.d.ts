import { Model, Optional } from 'sequelize';

interface UserAttributes {
  id: number;
  name: string;
  username: string;
  password: string;
}
interface UserInput extends Optional<UserAttributes, 'id'> {}
interface UserInstance
  extends Model<UserAttributes, UserInput>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}
