const express = require('express');
export const router = express.Router();
export const meetingForm = require('../controllers/meeting_form');
export const ann_form = require('../controllers/ann_form');
const theBulletin = require('../controllers/bulletin');
const dataHandler = require('../controllers/handleFormData');
// import { meetingAgenda } from "../controllers/handleFormData";


// const updatedAgenda =  await meetingAgenda();


router.get('/', async (req, res) => {
    const updatedAgenda =  await dataHandler.meetingAgenda();
    
    console.log(dataHandler.meetingAgenda());
    res.render('bulletin.ejs', {sacrament: updatedAgenda, updateDate: dataHandler.updateTime});
});
// router.use('/', require('../controllers/bulletin'));


// router.get('/form', formPage.runSample);
router.get('/annform', dataHandler.announcements);
router.get('/meetform', dataHandler.meetingAgenda);


// router.get('/form', (req, res) => {
//     res.send('runSample');
// });

router.get('/agenda', (req, res) => {
    res.render('sacrament.ejs');
});

// router.post('/submitNewMeet', (req, res) => {
//     console.log(req.body.meeting_date);
//     res.render('submitted.ejs');

// });




module.exports = router
