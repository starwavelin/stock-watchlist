import { Sequelize, DataTypes } from 'sequelize';

export const defineUser = (sequelize: Sequelize) => {
    return sequelize.define(
        'User',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            timestamps: true,
            tableName: 'user'
        }
    );
};

export interface UserData {
    id: number;
    username: string;
    email: string;
    password: string;
}
