require("dotenv").config();

const config = {
  // Server port
  port: process.env.PORT || 8080,

  // Database connection settings
  db: {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT || 5432,
  },

  frontendUrl: process.env.FRONTEND_URL,

  // AWS configuration
  awsConfig: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
    s3BucketName: process.env.S3_BUCKET_NAME,
    s3MailPrefix: process.env.S3_MAIL_PREFIX,
    cognitoClientId: process.env.COGNITO_CLIENT_ID,
    cognitoUserPoolId: process.env.COGNITO_USER_POOL_ID,
  },
};

module.exports = config;
