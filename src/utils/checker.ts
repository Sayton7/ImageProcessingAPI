import express from 'express';
import { promises as fs } from 'fs';

//using async await to read the images lists from the assets folder
const checker = async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    const imageName = req.query.name as string;
    const imageWidth = req.query.width as string;
    const imageHeight = req.query.height as string;
    const requestedImage =
    imageName + '_' + imageWidth + '_' + imageHeight + '.jpg';
    //using fs.readdir to get list of images in the assets & thumbnails folders
    const imagesList = await fs.readdir('./assets/');
    const renderedImagesList = await fs.readdir('./assets/thumbnails/');
    let imageCached: boolean;
    let imageFound: boolean;

    //check if the image is cached or not
    if (renderedImagesList.includes(requestedImage)) {
        imageCached = true;
        //using res.locals to pass variables to the next stage
        res.locals.imageCached = imageCached;
        next();
    //check if the image is found or not
    } else if (imagesList.includes(imageName + '.jpg')) {
        imageFound = true;
        res.locals.imageFound = imageFound;
        next();
    //if the image is neither cached nor found then pass the request to the next stage
    } else {
        next();
    }
}

export default checker;
