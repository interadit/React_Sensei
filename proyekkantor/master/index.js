/**
 * @author      : <Author's name>
 * @copyright   : PT. Elnusa, Tbk.
 * @since       : <Current Year>
 * @file        : index.js
 * @description : <Application's name> starter
 */


`use strict`;

const express = require('express');

const
    app      = require(`@elpi/core`),
    router   = require(`@elpi/router`);

app.start(() => {
    const
        route  = express(),
        server = route.listen(process.env.APP_PORT, process.env.APP_HOST);

    route.use(`/${process.env.APP_API}`, router());

    return server;
});