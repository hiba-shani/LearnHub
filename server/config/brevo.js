const SibApiV3Sdk = require("sib-api-v3-sdk");
console.log("brevo key=",process.env.BREVO_API_KEY);

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

module.exports = tranEmailApi;