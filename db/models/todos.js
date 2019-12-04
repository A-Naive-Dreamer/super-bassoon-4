'use strict'

module.exports = (sequelize, DataTypes) => {
    const Todos = sequelize.define(
        'Todos',
        {
            id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            todo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            status: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'uncompleted'
            }
        },
        {}
    )

    return Todos
}