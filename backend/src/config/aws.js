const aws = require("aws-sdk");
const nodemailer = require("nodemailer");
const { awsConfig } = require("../config");
let { defaultProvider } = require("@aws-sdk/credential-provider-node");

// Configure AWS SDK with credentials
aws.config.update({
  accessKeyId: awsConfig.accessKeyId,
  secretAccessKey: awsConfig.secretAccessKey,
  region: awsConfig.region,
});

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: "eu-west-1",
  defaultProvider,
});

// Create Nodemailer SES transporter
const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

module.exports = {
  aws,
  ses,
  transporter,
};
