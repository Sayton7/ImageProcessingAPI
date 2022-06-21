import { Router, Request, Response } from 'express';
import path from 'path';
import { promises as fs } from 'fs';

const images = Router();

images.get('/', async (req: Request, res: Response) => {
  const imagesList = await fs.readdir('./assets/');
  const imageName = req.query.name as string;
  const imageHeight = req.query.height as string;
  const imageWidth = req.query.width as string;
  const imageLocation = path.resolve('./' + `/assets/${imageName}.jpg`);

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
  } else if (/[a-z]/i.test(imageHeight) || /[a-z]/i.test(imageWidth)) {
    return res
      .status(400)
      .send('Bad request, Please enter your width and height in numbers');
  } else if (!imagesList.includes(imageName + '.jpg')) {
    return res.status(404).send('Image not found');
  } else {
    return res.status(200).sendFile(imageLocation);
  }
});

export default images;
