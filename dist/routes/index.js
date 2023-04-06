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
exports.ann_form = exports.meetingForm = exports.router = void 0;
const express = require('express');
exports.router = express.Router();
exports.meetingForm = require('../controllers/meeting_form');
exports.ann_form = require('../controllers/ann_form');
const theBulletin = require('../controllers/bulletin');
const dataHandler = require('../controllers/handleFormData');
// import { meetingAgenda } from "../controllers/handleFormData";
// const updatedAgenda =  await meetingAgenda();
exports.router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedAgenda = yield dataHandler.meetingAgenda();
    console.log(dataHandler.meetingAgenda());
    res.render('bulletin.ejs', { sacrament: updatedAgenda, updateDate: dataHandler.updateTime });
}));
// router.use('/', require('../controllers/bulletin'));
// router.get('/form', formPage.runSample);
exports.router.get('/annform', dataHandler.announcements);
exports.router.get('/meetform', dataHandler.meetingAgenda);
// router.get('/form', (req, res) => {
//     res.send('runSample');
// });
exports.router.get('/agenda', (req, res) => {
    res.render('sacrament.ejs');
});
// router.post('/submitNewMeet', (req, res) => {
//     console.log(req.body.meeting_date);
//     res.render('submitted.ejs');
// });
module.exports = exports.router;
//# sourceMappingURL=index.js.map