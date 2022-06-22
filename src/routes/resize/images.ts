import { Router, Request, Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';
import sharp from 'sharp';
import checker from '../../utils/checker';

const images = Router();

images.get('/', checker, (req: Request, res: Response) => {
  const imageCached = res.locals.imageCached;
  const imageFound = res.locals.imageFound;
  const imageName = req.query.name as string;
  const imageWidth = req.query.width as string;
  const imageHeight = req.query.height as string;
  const imageLocation = path.resolve('./' + `/assets/${imageName}.jpg`);
  const requestedImage =
    imageName + '_' + imageWidth + '_' + imageHeight + '.jpg';
  const requestedImageLocation = path.resolve(
    './' + '/assets/thumbnails/' + requestedImage
  );

  if (
    imageName === undefined ||
    imageHeight === undefined ||
    imageWidth === undefined
  ) {
    return res
      .status(400)
      .send(
        "Bad request, Please enter your required picture's name, width and height"
      );
  } else if (/[a-z]/i.test(imageWidth) || /[a-z]/i.test(imageHeight)) {
    return res
      .status(400)
      .send('Bad request, Please enter your width and height in numbers');
  } else if (imageCached) {
    console.log('serving cached image')
    return res.status(200).sendFile(requestedImageLocation);  
  } else if (!imageFound) {
    return res.status(404).send('Image not found');
  } else {
    console.log('serving rendered image')
    sharp(imageLocation)
      .resize(parseInt(imageWidth), parseInt(imageHeight))
      .toFile('./assets/thumbnails/' + requestedImage)
      .then(() => {
        return res
          .status(200)
          .sendFile(
            path.resolve('./' + '/assets/thumbnails/' + requestedImage)
          );
      })
      .catch((err) => {
        return res.status(500).send(err);
      });
  }
});

export default images;
