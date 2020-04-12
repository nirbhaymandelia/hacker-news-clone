import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import responseTime from 'response-time';
import bodyParser from 'body-parser';
import requestHandler from './requestHandler';

const app = express();

app.use(compression());
app.use(helmet());
app.use(bodyParser.json());

// To be able to serve static files
app.use('/assets', express.static('dist/client'));

app.use(morgan('short'));

app.use(
  responseTime((_req, res, time) => {
    res.setHeader('X-Response-Time', `${time.toFixed(2)}ms`);
    res.setHeader('Server-Timing', `renderServerSideApp;dur=${time}`);
  })
);

app.use('/robots.txt', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('User-agent: *\nDisallow:');
});

app.use(requestHandler);

export default app;
