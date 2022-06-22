import sharp from 'sharp';
import path from 'path';

const processImage = async (
  imageName: string,
  imageWidth: string,
  imageHeight: string
) => {
  const imageLocation = path.resolve('./' + `/assets/${imageName}.jpg`);
  const requestedImage =
    imageName + '_' + imageWidth + '_' + imageHeight + '.jpg';
  await sharp(imageLocation)
    .resize(parseInt(imageWidth), parseInt(imageHeight))
    .toFile('./assets/thumbnails/' + requestedImage)
    .then(() => {
      console.log('image processed');
    });
};

export default processImage;
