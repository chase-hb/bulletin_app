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
exports.meetingAgenda = void 0;
const routes_1 = require("../routes");
// Announcement question IDs
//-------------------------------
// 61d62c96 = What organization are you apart of?
// 6608eebe = "Announcements/Upcoming Activities for your organization. "
// 45ab6ada = "Is this a standing announcement?  All announcements will be removed after a week, unless otherwise noted. "
// 4f54834b = "Date to be Removed"
// Sacrament agenda question IDs
//-------------------------------
// 70313306 - closing prayer
// 74799939 - opening prayer
// 418b08e1 - speaker 1
// 15d1fbac - speaker 2
// 677f4be3 - speaker 3
// 1310795a - speaker 4
// 56d0c225 - speaker five 
// 52497229 - conductor
// 67a70f3c - opening hymn
// 0e3ff2a6 - date of meeting
// 21d7504a - Organist
// 6f66833f - presiding authority
// 05a5ad81 - password (7913)
// 7370ba47 - chorister
// 28a10444 - rest hymn
// 7afa6149 - sacrament hymn
// 53bd7a03 - closing hymn
const updateDate = new Date();
const updateTime = updateDate.toLocaleDateString() + " " + updateDate.toLocaleTimeString();
let sacramentAgenda = {
    date: "",
    presidingAuth: "Bishop Taylor",
    conducting: "Josh Aikele",
    chorister: "",
    organist: "",
    openHymn: "",
    openPrayer: "",
    sacramentHymn: "",
    speaker1: "",
    restHymn: "",
    speaker2: "",
    speaker3: "",
    speaker4: "",
    speaker5: "",
    closeHymn: "",
    closePrayer: ""
};
const options = { weekday: "long", year: 'numeric', month: "long", day: "numeric" };
const rightNow = new Date();
const formattedDate = new Date().toLocaleDateString(undefined, options);
const backupAgenda = {
    date: (formattedDate + " 12:00PM-1:00PM"),
    presidingAuth: "Bishop Taylor",
    conducting: "Josh Aikele",
    chorister: "-",
    organist: "-",
    openHymn: "(See hymn board)",
    openPrayer: "By Invitation",
    sacramentHymn: "(See hymn board)",
    speaker1: "To be announced",
    restHymn: "(See hymn board)",
    closeHymn: "(See hymn board)",
    closePrayer: "By Invitation"
};
function nextDayDate(aDate, dow) {
    aDate.setDate(aDate.getDate() + (dow + (7 - aDate.getDay())) % 7);
    return aDate;
}
function assignSacramentAgenda() {
    return __awaiter(this, void 0, void 0, function* () {
    });
}
function announcements(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // res.send(await formPage.runSample());
        const test = yield routes_1.ann_form.getAnnouncements();
        // const response0 = test.responses[0];
        // const q1 = response0.answers['45ab6ada'];
        // const answer = q1.textAnswers.answers;
        // const nestedValue = answer[0];
        // const test2 = test.responses[0].answers['45ab6ada'];
        // const test3 = test2.textAnswers.answers[0].value;
        // console.log(test);
        res.send(test);
    });
}
function meetingAgenda(req, res, next) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
    return __awaiter(this, void 0, void 0, function* () {
        // res.send(await formPage.runSample());
        let responseList = yield routes_1.meetingForm.getAgenda();
        responseList = responseList.responses;
        // const response0 = responses.responses[0];
        const responseDateId = "0e3ff2a6";
        const zero = "0";
        // console.log(typeof(responseDateId));
        // console.log("Response List: " + responseList[zero]);
        // const today = new Date().toISOString().substring(0,10);
        let today = new Date();
        const offset = today.getTimezoneOffset();
        today = new Date(today.getTime() - (offset * 60 * 1000));
        let todayString = today.toISOString().split('T')[0];
        console.log("TodayString: " + todayString);
        let meetingDatesObj = {};
        let agendaIdMatches = {};
        for (let eachResponse in responseList) {
            console.log("DATE: " + responseList[eachResponse].answers[responseDateId].textAnswers.answers["0"].value);
            let meetingDateString = responseList[eachResponse].answers[responseDateId].textAnswers.answers["0"].value;
            let meetingDate = new Date(Date.parse(meetingDateString));
            meetingDatesObj[meetingDateString] = responseList[eachResponse].responseId;
            agendaIdMatches[responseList[eachResponse].responseId] = eachResponse;
            // Save dates in 'meetingDates' with this pairing> date:responseId
            // AND
            // Save all the dates into an array for actual comparing. When you have the desired date, use it in the object to get the desired responseId.
            // Maybe we don't have to compare numbers at all if we can utilize certain built-in javascript functions for arrays or something?
            //
        }
        // let nextAgenda;
        if (today.getDay() == 0) {
            // If today is Sunday, but no bulletin is found for today.
            if (!meetingDatesObj[todayString]) {
                return backupAgenda;
            }
            else {
                const nextAgenda = meetingDatesObj[todayString];
                sacramentAgenda = {
                    date: responseList[nextAgenda].answers[responseDateId].textAnswers.answers["0"].value,
                    presidingAuth: responseList[nextAgenda].answers["6f66833f"].textAnswers.answers["0"].value,
                    conducting: responseList[nextAgenda].answers["52497229"].textAnswers.answers["0"].value,
                    chorister: responseList[nextAgenda].answers["7370ba47"].textAnswers.answers["0"].value,
                    organist: responseList[nextAgenda].answers["21d7504a"].textAnswers.answers["0"].value,
                    openHymn: responseList[nextAgenda].answers["67a70f3c"].textAnswers.answers["0"].value,
                    openPrayer: responseList[nextAgenda].answers["74799939"].textAnswers.answers["0"].value,
                    sacramentHymn: responseList[nextAgenda].answers["7afa6149"].textAnswers.answers["0"].value,
                    speaker1: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value,
                    speaker2: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value,
                    speaker3: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value,
                    speaker4: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value,
                    speaker5: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value,
                    restHymn: responseList[nextAgenda].answers["28a10444"].textAnswers.answers["0"].value,
                    closeHymn: responseList[nextAgenda].answers["53bd7a03"].textAnswers.answers["0"].value,
                    closePrayer: responseList[nextAgenda].answers["70313306"].textAnswers.answers["0"].value
                };
                // Next Step, account for if it's not sunday. (so far it only updates if it's sunday)
            }
        }
        else {
            let nextSunday = nextDayDate(new Date, 0);
            nextSunday = new Date(nextSunday.getTime() - (offset * 60 * 1000));
            // let todayString = today.toISOString().split('T')[0];
            nextSunday = nextSunday.toISOString().split('T')[0];
            if (!meetingDatesObj[nextSunday]) {
                console.log("No agenda found for " + nextSunday);
                return backupAgenda;
            }
            else {
                const nextAgenda = agendaIdMatches[meetingDatesObj[nextSunday]];
                let rawDate = new Date(Date.parse(responseList[nextAgenda].answers[responseDateId].textAnswers.answers["0"].value + "T00:00:00.000-06:00"));
                // rawDate = rawDate.getTime() - (offset*60*1000);
                const formattedDate = rawDate.toLocaleDateString(undefined, options);
                console.log("Got to line ~182");
                // res.send(responseList[nextAgenda]);
                console.log("TEST: " + responseList[nextAgenda].answers[responseDateId].textAnswers.answers["0"].value);
                sacramentAgenda = {
                    date: formattedDate + " 12:00PM-1:00PM",
                    presidingAuth: (_a = responseList[nextAgenda].answers["6f66833f"]) === null || _a === void 0 ? void 0 : _a.textAnswers.answers["0"].value,
                    conducting: (_b = responseList[nextAgenda].answers["52497229"]) === null || _b === void 0 ? void 0 : _b.textAnswers.answers["0"].value,
                    chorister: (_c = responseList[nextAgenda].answers["7370ba47"]) === null || _c === void 0 ? void 0 : _c.textAnswers.answers["0"].value,
                    organist: (_d = responseList[nextAgenda].answers["21d7504a"]) === null || _d === void 0 ? void 0 : _d.textAnswers.answers["0"].value,
                    openHymn: responseList[nextAgenda].answers["67a70f3c"].textAnswers.answers["0"].value,
                    openPrayer: responseList[nextAgenda].answers["74799939"].textAnswers.answers["0"].value,
                    sacramentHymn: responseList[nextAgenda].answers["7afa6149"].textAnswers.answers["0"].value,
                    speaker1: (_e = responseList[nextAgenda].answers["418b08e1"]) === null || _e === void 0 ? void 0 : _e.textAnswers.answers["0"].value,
                    speaker2: (_f = responseList[nextAgenda].answers["15d1fbac"]) === null || _f === void 0 ? void 0 : _f.textAnswers.answers["0"].value,
                    speaker3: (_g = responseList[nextAgenda].answers["677f4be3"]) === null || _g === void 0 ? void 0 : _g.textAnswers.answers["0"].value,
                    speaker4: (_h = responseList[nextAgenda].answers["1310795a"]) === null || _h === void 0 ? void 0 : _h.textAnswers.answers["0"].value,
                    speaker5: (_j = responseList[nextAgenda].answers["56d0c225"]) === null || _j === void 0 ? void 0 : _j.textAnswers.answers["0"].value,
                    restHymn: (_k = responseList[nextAgenda].answers["28a10444"]) === null || _k === void 0 ? void 0 : _k.textAnswers.answers["0"].value,
                    closeHymn: responseList[nextAgenda].answers["53bd7a03"].textAnswers.answers["0"].value,
                    closePrayer: responseList[nextAgenda].answers["70313306"].textAnswers.answers["0"].value
                };
            }
        }
        // console.log(sacramentAgenda);
        console.log("Got to the end");
        return sacramentAgenda;
    });
}
exports.meetingAgenda = meetingAgenda;
module.exports = { backupAgenda, updateTime, meetingAgenda, announcements };
//# sourceMappingURL=handleFormData.js.map