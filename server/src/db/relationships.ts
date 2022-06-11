import { Sequelize } from "sequelize";

const applyRelationships = (sequelize:Sequelize) => {
    const {User,Transaction}=sequelize.models;
    Transaction.belongsTo(User);
}
export default applyRelationships;