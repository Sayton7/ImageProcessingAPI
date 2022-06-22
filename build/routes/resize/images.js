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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
const sharp_1 = __importDefault(require("sharp"));
const images = (0, express_1.Router)();
images.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const imagesList = yield fs_1.promises.readdir('./assets/');
    const renderedImagesList = yield fs_1.promises.readdir('./assets/thumbnails/');
    const imageName = req.query.name;
    const imageWidth = req.query.width;
    const imageHeight = req.query.height;
    const imageLocation = path_1.default.resolve('./' + `/assets/${imageName}.jpg`);
    const requestedImage = imageName + '_' + imageWidth + '_' + imageHeight + '.jpg';
    const requestedImageLocation = path_1.default.resolve('./' + '/assets/thumbnails/' + requestedImage);
    if (imageName === undefined ||
        imageHeight === undefined ||
        imageWidth === undefined) {
        return res
            .status(400)
            .send("Bad request, Please enter your required picture's name, width and height");
    }
    else if (/[a-z]/i.test(imageWidth) || /[a-z]/i.test(imageHeight)) {
        return res
            .status(400)
            .send('Bad request, Please enter your width and height in numbers');
    }
    else if (!imagesList.includes(imageName + '.jpg')) {
        return res.status(404).send('Image not found');
    }
    else if (renderedImagesList.includes(requestedImage)) {
        return res.status(200).sendFile(requestedImageLocation);
    }
    else {
        (0, sharp_1.default)(imageLocation)
            .resize(parseInt(imageWidth), parseInt(imageHeight))
            .toFile('./assets/thumbnails/' + requestedImage)
            .then(() => {
            return res
                .status(200)
                .sendFile(path_1.default.resolve('./' + '/assets/thumbnails/' + requestedImage));
        });
    }
}));
exports.default = images;
