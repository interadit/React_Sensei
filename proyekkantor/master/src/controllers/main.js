/**
 * @file        : main.js
 * @description : Main controller
 */

`use strict`;

module.exports = {

    // sync sample
    sync : (req, res, payload) => {

        // publish to service `user` with topic `user/sync`
        api.publish(svc.user, `sync`, false, {
            ...req,

            params : {
                key : `some_value`
            }
        });
    },

    // async sample
    async : (req, res, payload) => {

        // publish to service `user` with topic `user/async`
        // if parameter `sync` is not set to `false`, this api publish will be set to async by default
        api.publish(svc.user, `async`, {
            key : `some_value`
        }).then((data) => {
            res.json(data);
        });
    },

    // api publish with custom timeout
    timeout : (req, res, payload) => {

        // sync
        api.publish(svc.user, `sync`, false, 3000, {
            key : `some_value`
        });

        // async
        api.publish(svc.user, `timeout`, 3000, {
            key : `some_value`
        }).then((data) => {
            res.json(data);
        });
    }
};