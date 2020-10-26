/**
 * @file        : sample.js
 * @description : Sample Schema
 */

`use strict`;

const Sequelize = require(`sequelize`);

module.exports = (db) => {

    return db.define(`sample`, {
        title     : {
            type      : Sequelize.STRING,
            allowNull : false,
            validate  : {
                isIn  : [`mr`, `mrs`, `ms`]
            }
        },
        name      : {
            type      : Sequelize.STRING,
            allowNull : false
        },
        dob       : {
            type      : Sequelize.DATE,
            allowNull : false
        },
        email     : {
            type      : Sequelize.STRING,
            allowNull : false,
            isEmail   : true
        },
        statusid  : {
            type      : Sequelize.INTEGER,
            allowNull : false
        },
        createby      : {
            type      : Sequelize.STRING,
            allowNull : false
        }
    }, {
        freezeTableName : true,
        createdAt       : false,
        updatedAt       : false
    });

};