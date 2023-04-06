import { router, ann_form, meetingForm } from "../routes";



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
    speaker1: "" ,
    restHymn: "",
    speaker2: "",
    speaker3: "",
    speaker4: "",
    speaker5: "",
    closeHymn: "",
    closePrayer: ""
}

const options: Intl.DateTimeFormatOptions = { weekday: "long", year: 'numeric', month: "long", day: "numeric" };
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
    speaker1: "To be announced" ,
    restHymn: "(See hymn board)",
    closeHymn: "(See hymn board)",
    closePrayer: "By Invitation"
}




function nextDayDate(aDate, dow){
    aDate.setDate(aDate.getDate() + (dow+(7-aDate.getDay())) % 7);
    return aDate;
}

async function assignSacramentAgenda(){

}

async function announcements(req, res, next) {
    // res.send(await formPage.runSample());
    const test = await ann_form.getAnnouncements();
    // const response0 = test.responses[0];
    // const q1 = response0.answers['45ab6ada'];
    // const answer = q1.textAnswers.answers;
    // const nestedValue = answer[0];

    // const test2 = test.responses[0].answers['45ab6ada'];
    // const test3 = test2.textAnswers.answers[0].value;

    // console.log(test);
    res.send(test);

}



export async function meetingAgenda(req, res, next) { 
    // res.send(await formPage.runSample());
    let responseList = await meetingForm.getAgenda();
    responseList = responseList.responses;
    // const response0 = responses.responses[0];
    const responseDateId: string = "0e3ff2a6";
    const zero = "0";
    // console.log(typeof(responseDateId));
    // console.log("Response List: " + responseList[zero]);
    // const today = new Date().toISOString().substring(0,10);
    let today = new Date();
    const offset = today.getTimezoneOffset();
    today = new Date(today.getTime() - (offset*60*1000));
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
    
    
    if (today.getDay() == 0 ){
        // If today is Sunday, but no bulletin is found for today.
        if(!meetingDatesObj[todayString]){
            return backupAgenda;
        }
        else{
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
                speaker1: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value ,
                speaker2: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value ,
                speaker3: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value ,
                speaker4: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value ,
                speaker5: responseList[nextAgenda].answers["418b08e1"].textAnswers.answers["0"].value ,
                restHymn: responseList[nextAgenda].answers["28a10444"].textAnswers.answers["0"].value,
                closeHymn: responseList[nextAgenda].answers["53bd7a03"].textAnswers.answers["0"].value,
                closePrayer: responseList[nextAgenda].answers["70313306"].textAnswers.answers["0"].value
            }
            // Next Step, account for if it's not sunday. (so far it only updates if it's sunday)
        }
        

    } else {
        let nextSunday = nextDayDate(new Date, 0);
        nextSunday = new Date(nextSunday.getTime() - (offset*60*1000));
        // let todayString = today.toISOString().split('T')[0];
        nextSunday = nextSunday.toISOString().split('T')[0];

        if(!meetingDatesObj[nextSunday]){
            
            console.log("No agenda found for " + nextSunday)
            return backupAgenda;
        } else{
            const nextAgenda = agendaIdMatches[meetingDatesObj[nextSunday]];
            let rawDate = new Date(Date.parse(responseList[nextAgenda].answers[responseDateId].textAnswers.answers["0"].value + "T00:00:00.000-06:00"));
            // rawDate = rawDate.getTime() - (offset*60*1000);
            const formattedDate = rawDate.toLocaleDateString(undefined, options);
            console.log("Got to line ~182");
            
            // res.send(responseList[nextAgenda]);
            console.log("TEST: "  + responseList[nextAgenda].answers[responseDateId].textAnswers.answers["0"].value);
            sacramentAgenda = {
                date: formattedDate + " 12:00PM-1:00PM",
                presidingAuth: responseList[nextAgenda].answers["6f66833f"]?.textAnswers.answers["0"].value,
                conducting: responseList[nextAgenda].answers["52497229"]?.textAnswers.answers["0"].value,
                chorister: responseList[nextAgenda].answers["7370ba47"]?.textAnswers.answers["0"].value,
                organist: responseList[nextAgenda].answers["21d7504a"]?.textAnswers.answers["0"].value,
                openHymn: responseList[nextAgenda].answers["67a70f3c"].textAnswers.answers["0"].value,
                openPrayer: responseList[nextAgenda].answers["74799939"].textAnswers.answers["0"].value,
                sacramentHymn: responseList[nextAgenda].answers["7afa6149"].textAnswers.answers["0"].value,
                speaker1: responseList[nextAgenda].answers["418b08e1"]?.textAnswers.answers["0"].value ,
                speaker2: responseList[nextAgenda].answers["15d1fbac"]?.textAnswers.answers["0"].value ,
                speaker3: responseList[nextAgenda].answers["677f4be3"]?.textAnswers.answers["0"].value ,
                speaker4: responseList[nextAgenda].answers["1310795a"]?.textAnswers.answers["0"].value ,
                speaker5: responseList[nextAgenda].answers["56d0c225"]?.textAnswers.answers["0"].value ,
                restHymn: responseList[nextAgenda].answers["28a10444"]?.textAnswers.answers["0"].value,
                closeHymn: responseList[nextAgenda].answers["53bd7a03"].textAnswers.answers["0"].value,
                closePrayer: responseList[nextAgenda].answers["70313306"].textAnswers.answers["0"].value
            }

        }


    }

    // console.log(sacramentAgenda);
    console.log("Got to the end");
    return sacramentAgenda;


}



module.exports = { backupAgenda, updateTime, meetingAgenda, announcements};