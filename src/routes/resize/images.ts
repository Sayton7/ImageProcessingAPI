import { Router, Request, Response } from 'express';
import path from 'path';
import sharp from 'sharp';
import checker from '../../utils/checker';

const images = Router();

//using checker middleware to check if the image is cached or not found
images.get('/', checker, (req: Request, res: Response) => {
  const imageCached = res.locals.imageCached;
  const imageFound = res.locals.imageFound;
  const imageName = req.query.name as string;
  const imageWidth = req.query.width as string;
  const imageHeight = req.query.height as string;
  //setting a format for the width and height
  const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~a-z]/i;
  const imageLocation = path.resolve('./' + `/assets/${imageName}.jpg`);
  const requestedImage =
    imageName + '_' + imageWidth + '_' + imageHeight + '.jpg';
  //using path.resolve() to get the absolute path of the image
  const requestedImageLocation = path.resolve(
    './' + '/assets/thumbnails/' + requestedImage
  );
  
  //check if any parameter is missing
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
  //check whether the width and height are numbers or not
  } else if (format.test(imageWidth) || format.test(imageHeight)) {
    return res
      .status(400)
      .send('Bad request, Please enter your width and height in numbers');
  //check if the image is cached or not
  } else if (imageCached) {
    console.log('serving cached image')
    return res.status(200).sendFile(requestedImageLocation);
  //check if the image is found or not
  } else if (!imageFound) {
    return res.status(404).send('Image not found');
  //resize the image and save it in the thumbnails folder using sharp
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
