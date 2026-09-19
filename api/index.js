// Vercel Serverless Function Entrypoint
// Bridges Vercel serverless requests to the Express application
const app = require('../server/index');

module.exports = app;
