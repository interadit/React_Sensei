/**
 * @file        : main.js
 * @description : Main model
 */

`use strict`;

module.exports = {

    home : (req, res, payload) => {

        // sample database call
        // select * from sample where statusid = 1
        db.sample.findAll({
            attributes : [ `id`, `name` ],
            where      : {
                statusid : 1
            },
            raw : true
        }).then((rows) => {
            res.json(rows);
        });
    }
};