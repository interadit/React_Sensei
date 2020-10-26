/**
 * @file        : sample.js
 * @description : Nested route sample
 */

`use strict`;

module.exports = (router) => {

    // API address => http://localhost:8080/api/v1/sample/home
    router.get(`/home`, `general`, [], (req, res) => {
        controller.sample.home(req, res);
    });

    return router;
};