/**
 * @file        : sample.js
 * @description : Sample controller
 */

`use strict`;

module.exports = {

    // sample cache usage
    cache : (req, res) => {

        // get data from redis with key user:<http_request_param>
        cache.get(`user:${req.query.id}`, (error, data) => {

            // if key is found
            if(data) {
                res.json(data);
                return;
            }

            // else, get from User service, synchronously.
            // Service User, will then return the payload and will be processed in `models > sample.js > cache`
            api.publish(svc.user, `cache`, false, {
                ... req,

                target : `user/cache`,
                params : {
                    id : req.query.id
                }
            });
        });

    }
};