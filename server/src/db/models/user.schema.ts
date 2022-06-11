import { DataTypes, Sequelize } from "sequelize";
import {UserInstance } from "./@types/user";

const User=(sequelize:Sequelize)=>{
    const User=sequelize.define<UserInstance>('user',{
        id:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type:DataTypes.INTEGER
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
        }
    })
    return User;
}
export default User