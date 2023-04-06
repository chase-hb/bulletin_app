'use strict';

const ann_path = require('path');
const ann_google = require('@googleapis/forms');
const {authenticate} = require('@google-cloud/local-auth'); 

const ann_formIDModded = '<Form_ID>';

async function getAnnouncementsModded(req, res, next) {
    const auth = new ann_google.auth.GoogleAuth({
        keyFile: '<KeyFile>.json',
          // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ['https://www.googleapis.com/auth/forms.responses.readonly', 'https://www.googleapis.com/auth/forms.body.readonly']
      });

  const forms = ann_google.forms({
    version: 'v1',
    auth: auth,
  });
  let formBody = await forms.forms.get({formId: ann_formID});

    let googleRes = await forms.forms.responses.list({
        formId: ann_formID,
    });

  return googleRes.data;
}

// if (module === require.main) {
//   runSample().catch(console.error);
// }

module.exports = {getAnnouncements};