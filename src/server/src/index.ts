/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import express from 'express';
import { OpenPage } from './containers/Puppeteer';

const PORT = process.env.PORT || 5000;
const app = express();

app.get('/pckoubou/names', (req, res) => {
  OpenPage(1, 0, 0)
    .then((Resolve) => {
      res.setHeader('Content-Type', 'application/json');
      res.json(JSON.stringify(Resolve));
    })
    .catch((error) => console.error(error));
});

app.get('/pckoubou/prices', (req, res) => {
  OpenPage(0, 1, 0)
    .then((Resolve) => {
      res.setHeader('Content-Type', 'application/json');
      res.json(JSON.stringify(Resolve));
    })
    .catch((error) => console.error(error));
});

app.get('/pckoubou/id', (req, res) => {
  OpenPage(0, 0, 1)
    .then((Resolve) => {
      res.setHeader('Content-Type', 'application/json');
      res.json(JSON.stringify(Resolve));
    })
    .catch((error) => console.error(error));
});

app.listen(PORT, () => {
  console.log('Server running on port %d', PORT);
});
