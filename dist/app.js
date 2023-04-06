"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 3000;
const theRouter = require('./routes/index');
const cron = require('node-cron');
app.use(express_1.default.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', theRouter);
app.use(express_1.default.static(__dirname + '/public'));
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
//# sourceMappingURL=app.js.map