#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { PortfolioStack } from "./stack.js";

export const name = (id: string) => "Portfolio" + id;
export type StackProps = cdk.StackProps & typeof props;

const app = new cdk.App();

const props = {
  domainName: process.env.DOMAIN_NAME!,
  env: {
    region: process.env.AWS_REGION!,
    account: process.env.AWS_ACCOUNT!
  }
};

if (!props.domainName) throw new Error("domainName is required");
if (!props.env.region) throw new Error("env region is required");
if (!props.env.account) throw new Error("env account is required");

new PortfolioStack(app, name("Stack"), props);
