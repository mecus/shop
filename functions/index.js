const functions = require('firebase-functions');
const express   = require('express');
const path      = require('path');
const cons = require('consolidate');

const app = express();
app.engine('html', cons.swig);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, "../dist")));

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
app.get('/function', (req, res)=>{
    res.json({ "Date": `${Date.now()}`});
    
})
app.get('/home', (req, res, next)=>{
    res.render('home');
})
app.get('/*', (req, res)=>{
    // res.set('Cache-Control', 'public, max-age=3000, s-maxage=600');
    return res.sendFile(path.join(__dirname, '../dist/index.html'));
})
app.get('/dev', (req, res)=>{
    res.set('Cache-Control', 'public, max-age=3000, s-maxage=600');
    return res.sendFile(path.join(__dirname, '../dist/index.html'));
})

exports.server = functions.https.onRequest(app);
