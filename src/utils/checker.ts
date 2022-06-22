import express from 'express';
import { promises as fs } from 'fs';

const checker = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const imageName = req.query.name as string;
    const imageWidth = req.query.width as string;
    const imageHeight = req.query.height as string;
    const requestedImage =
    imageName + '_' + imageWidth + '_' + imageHeight + '.jpg';
    const imagesList = await fs.readdir('./assets/');
    const renderedImagesList = await fs.readdir('./assets/thumbnails/');
    let imageCached: boolean;
    let imageFound: boolean;

    if (renderedImagesList.includes(requestedImage)) {
        imageCached = true;
        res.locals.imageCached = imageCached;
        next();
    } else if (imagesList.includes(imageName + '.jpg')) {
        imageFound = true;
        res.locals.imageFound = imageFound;
        next();
    } else {
        next();
    }
}

export default checker;
