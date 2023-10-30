#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PortfolioStack } from "./portfolio-stack.js";

const app = new cdk.App();

new PortfolioStack(app, "PortfolioStack", {
  domainName: process.env.DOMAIN_NAME!,
  env: {
    region: process.env.AWS_REGION!,
    account: process.env.AWS_ACCOUNT!
  }
});
