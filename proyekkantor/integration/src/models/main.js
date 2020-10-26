/**
 * @file        : main.js
 * @description : Main model
 */

`use strict`;

module.exports = {

    home : ({ source, target, data }) => {

        // sample db usage
        // select * from sample where statusid = 1
        db.sample.findAll({
            where : {
                statusid : 1
            },
            raw: true
        }).then((users) => {

            // sample cache usage
            // insert data to redis with key sample:<request_params>
            cache.set(`sample:${data.params.id}`, JSON.stringify(users), (err, reply) => {

                // sample sync api publish
                api.publish(source, target, false, {
                    ... data,

                    body : users
                });
            });
        });

    }
};