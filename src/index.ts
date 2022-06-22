import express from 'express';
import routes from './routes/resize/index';

const app = express();
const port = 3000;

// welcoming message in the main directory
app.get('/', (req: express.Request, res: express.Response): void => {
  res.send('ImageProcessingAPI');
});

// adding the routes to the app
app.use('/resize', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
