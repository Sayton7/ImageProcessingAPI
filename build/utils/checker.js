"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
//using async await to read the images lists from the assets folder
const checker = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const imageName = req.query.name;
    const imageWidth = req.query.width;
    const imageHeight = req.query.height;
    const requestedImage = imageName + '_' + imageWidth + '_' + imageHeight + '.jpg';
    //using fs.readdir to get list of images in the assets & thumbnails folders
    const imagesList = yield fs_1.promises.readdir('./assets/');
    const renderedImagesList = yield fs_1.promises.readdir('./assets/thumbnails/');
    let imageCached;
    let imageFound;
    //check if the image is cached or not
    if (renderedImagesList.includes(requestedImage)) {
        imageCached = true;
        //using res.locals to pass variables to the next stage
        res.locals.imageCached = imageCached;
        next();
        //check if the image is found or not
    }
    else if (imagesList.includes(imageName + '.jpg')) {
        imageFound = true;
        res.locals.imageFound = imageFound;
        next();
        //if the image is neither cached nor found then pass the request to the next stage
    }
    else {
        next();
    }
});
exports.default = checker;
