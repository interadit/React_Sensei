/**
 * @file        : main.js
 * @description : Main controller
 */

`use strict`;

 const { authenticate, authorization } = require(`@elpi/middleware`);

module.exports = (router) => {

    // API address => http://localhost:8080/api/v1/home
    router.get(`/home`, `general`, [ authenticate, authorization ], (req, res) => {
        controller.main.home(req, res);
    });

    return router;
};