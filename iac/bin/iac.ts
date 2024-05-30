#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IacStack } from '../lib/iac-stack';

const app = new cdk.App();
new IacStack(app, 'email95Stack', {
  
  env: { account: '363615071302', region: 'eu-west-1' },
  stackName: 'email95Stack',
  tags: {
      "owner": "lesedij@bbd.co.za",
      "created-using": "cdk",
  },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});