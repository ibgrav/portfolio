#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PortfolioStack } from "./stack.js";

const app = new cdk.App();

const region = process.env.AWS_REGION;
const account = process.env.AWS_ACCOUNT;

if (!region || !account) throw new Error(`Missing AWS_REGION or AWS_ACCOUNT`);

new PortfolioStack(app, "PortfolioStack", {
  env: { region, account }
});
