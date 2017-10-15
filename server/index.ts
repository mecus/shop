import 'zone.js/dist/zone-node';
import * as functions from 'firebase-functions';
import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import * as express from 'express';
import * as fs from 'fs';
import { join } from 'path';

const document = fs.readFileSync(__dirname + '/index.html', 'utf8');
const AppServerModuleNgFactory = require(__dirname + '/dist-ssr/main.bundle').AppServerModuleNgFactory;

enableProdMode();
const app = express();

const { sendMail } = require('./controllers/mailer');
app.get('/test', (req, res)=>{res.send(`${Date.now()}`)});
app.post('/mail', sendMail);

app.get('**', (req, res) => {
  const url = req.path;
  renderModuleFactory(AppServerModuleNgFactory, {document, url})
    .then(html=> {
      res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
      res.send(html);
    }).catch(err=> console.log(err.message));
});

export let server = functions.https.onRequest(app);