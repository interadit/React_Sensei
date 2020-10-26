/**
 * @file        : sample.js
 * @description : Sample model
 */

`use strict`;

module.exports = {

    // sample set cache
    cache : (req, res, { source, trigger, data }) => {

        // cache.set(key: String, payload: Any , callback: Function)
        // Store data to redis with key sample:<id_from_http_request>
        cache.set(`sample:${req.query.id}`, JSON.stringify(data.body), (err, reply) => {
            res.json(data.body);
        });
    }
};