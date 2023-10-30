import { join } from "path";
import type { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as api from "aws-cdk-lib/aws-apigateway";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

const dist = join(process.cwd(), "dist/client");
const name = (tag: string) => "Portfolio" + tag;

interface PortfolioStackProps extends StackProps {
  domainName: string;
  env: Required<StackProps["env"]>;
}

export class PortfolioStack extends Stack {
  constructor(scope: Construct, id: string, props?: PortfolioStackProps) {
    super(scope, id, props);

    if (!props?.domainName) throw new Error("domainName is required");
    if (!props?.env?.region) throw new Error("env region is required");
    if (!props?.env?.account) throw new Error("env account is required");

    const bucket = new s3.Bucket(this, name("Bucket"));

    new s3Deployment.BucketDeployment(this, name("BucketDeployment"), {
      sources: [s3Deployment.Source.asset(dist)],
      destinationBucket: bucket
    });

    const fn = new NodejsFunction(this, name("Function"), {
      handler: "handler",
      entry: "dist/server/lambda.js",
      runtime: lambda.Runtime.NODEJS_18_X
    });

    fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    });

    const gateway = new api.LambdaRestApi(this, name("Api"), { handler: fn });

    const zone = new route53.HostedZone(this, "HostedZone", {
      zoneName: props.domainName
    });

    new acm.Certificate(this, name("Certificate"), {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(zone)
    });

    new cloudfront.Distribution(this, name("Distribution"), {
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      defaultBehavior: {
        origin: new origins.RestApiOrigin(gateway)
      }
    });
  }
}
