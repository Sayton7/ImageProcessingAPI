"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/resize/index"));
const app = (0, express_1.default)();
const port = 3000;
// welcoming message in the main directory
app.get('/', (req, res) => {
    res.send('ImageProcessingAPI');
});
// adding the routes to the app
app.use('/resize', index_1.default);
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
exports.default = app;
