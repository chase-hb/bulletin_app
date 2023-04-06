'use strict';

export const path = require('path');
export const google = require('@googleapis/forms');
export const {authenticate} = require('@google-cloud/local-auth'); 

const formID = '<FormId>';

async function getAgenda(req, res, next) {
    const auth = new google.auth.GoogleAuth({
        keyFile: '<KeyFile>.json',
          // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ['https://www.googleapis.com/auth/forms.responses.readonly', 'https://www.googleapis.com/auth/forms.body.readonly']
      });

//   });
  const forms = google.forms({
    version: 'v1',
    auth: auth,
  });
  let formBody = await forms.forms.get({formId: formID});

    let googleRes = await forms.forms.responses.list({
        formId: formID,
    });

  return googleRes.data;
}



module.exports = {getAgenda};