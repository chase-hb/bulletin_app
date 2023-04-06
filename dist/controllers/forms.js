'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const path = require('path');
const google = require('@googleapis/forms');
const { authenticate } = require('@google-cloud/local-auth');
const formID = '1UKyOI4BTgcLY12Wr7cezLghDo-BQrzYLS2Dw7ePyC4o';
function runSample(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'awesome-tensor-367904-ec86b454bf83.json',
            // Scopes can be specified either as an array or as a single, space-delimited string.
            scopes: ['https://www.googleapis.com/auth/forms.responses.readonly', 'https://www.googleapis.com/auth/forms.body.readonly']
        });
        //   const auth = await authenticate({
        //     keyfilePath: path.join(__dirname, '/awesome-tensor-367904-ec86b454bf83.json'),
        //     scopes: 'https://www.googleapis.com/auth/forms.body.readonly',
        //   });
        const forms = google.forms({
            version: 'v1',
            auth: auth,
        });
        let formBody = yield forms.forms.get({ formId: formID });
        //   console.log(res.data);
        //   return res.data;
        let googleRes = yield forms.forms.responses.list({
            formId: formID,
        });
        return googleRes.data;
    });
}
// if (module === require.main) {
//   runSample().catch(console.error);
// }
module.exports = { runSample };
//# sourceMappingURL=forms.js.map