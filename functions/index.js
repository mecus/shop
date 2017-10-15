"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("zone.js/dist/zone-node");
const functions = require("firebase-functions");
const platform_server_1 = require("@angular/platform-server");
const core_1 = require("@angular/core");
const express = require("express");
const fs = require("fs");
const document = fs.readFileSync(__dirname + '/index.html', 'utf8');
const AppServerModuleNgFactory = require(__dirname + '/dist-ssr/main.bundle').AppServerModuleNgFactory;
core_1.enableProdMode();
const app = express();
const { sendMail } = require('./controllers/mailer');
app.get('/test', (req, res)=>{res.send(`${Date.now()}`)});
app.post('/mail', sendMail);
app.get('**', (req, res) => {
    const url = req.path;
    platform_server_1.renderModuleFactory(AppServerModuleNgFactory, { document, url })
        .then(html => {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.send(html);
    }).catch(err=> console.log(err.message));
});
exports.server = functions.https.onRequest(app);
