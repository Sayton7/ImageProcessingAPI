"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const sharp_1 = __importDefault(require("sharp"));
const checker_1 = __importDefault(require("../../utils/checker"));
const images = (0, express_1.Router)();
//using checker middleware to check if the image is cached or not found
images.get('/', checker_1.default, (req, res) => {
    const imageCached = res.locals.imageCached;
    const imageFound = res.locals.imageFound;
    const imageName = req.query.name;
    const imageWidth = req.query.width;
    const imageHeight = req.query.height;
    //setting a format for the width and height
    const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~a-z]/i;
    const imageLocation = path_1.default.resolve('./' + `/assets/${imageName}.jpg`);
    const requestedImage = imageName + '_' + imageWidth + '_' + imageHeight + '.jpg';
    //using path.resolve() to get the absolute path of the image
    const requestedImageLocation = path_1.default.resolve('./' + '/assets/thumbnails/' + requestedImage);
    //check if any parameter is missing
    if (imageName === undefined ||
        imageHeight === undefined ||
        imageWidth === undefined) {
        return res
            .status(400)
            .send("Bad request, Please enter your required picture's name, width and height");
        //check whether the width and height are numbers or not
    }
    else if (format.test(imageWidth) || format.test(imageHeight)) {
        return res
            .status(400)
            .send('Bad request, Please enter your width and height in numbers');
        //check if the image is cached or not
    }
    else if (imageCached) {
        console.log('serving cached image');
        return res.status(200).sendFile(requestedImageLocation);
        //check if the image is found or not
    }
    else if (!imageFound) {
        return res.status(404).send('Image not found');
        //resize the image and save it in the thumbnails folder using sharp
    }
    else {
        console.log('serving rendered image');
        (0, sharp_1.default)(imageLocation)
            .resize(parseInt(imageWidth), parseInt(imageHeight))
            .toFile('./assets/thumbnails/' + requestedImage)
            .then(() => {
            return res
                .status(200)
                .sendFile(path_1.default.resolve('./' + '/assets/thumbnails/' + requestedImage));
        })
            .catch((err) => {
            return res.status(500).send(err);
        });
    }
});
exports.default = images;
