import express from 'express';
import routes from './routes/resize/index';

const app = express();
const port = 3000;

app.use('/resize', routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
