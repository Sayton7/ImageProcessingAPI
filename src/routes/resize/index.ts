import express from 'express';
import images from './images';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('main resize route');
});

routes.use('/images', images);

export default routes;
