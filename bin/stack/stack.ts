import { join } from "path";
import type { Construct } from "constructs";
import { CfnOutput, RemovalPolicy, Stack, aws_route53_targets as targets } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as api from "aws-cdk-lib/aws-apigateway";
import * as route53 from "aws-cdk-lib/aws-route53";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3Deployment from "aws-cdk-lib/aws-s3-deployment";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { StackProps, name } from "./cdk.js";

const dist = join(process.cwd(), "dist/client");

export class PortfolioStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, name("Bucket"), {
      removalPolicy: RemovalPolicy.DESTROY
    });

    const fn = new NodejsFunction(this, name("Function"), {
      handler: "handler",
      entry: "dist/server/lambda.js",
      runtime: lambda.Runtime.NODEJS_18_X
    });

    const fnUrl = fn.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE
    });

    new CfnOutput(this, name("FunctionUrl"), {
      value: fnUrl.url
    });

    const zone = new route53.HostedZone(this, "HostedZone", {
      zoneName: props.domainName
    });

    const certificate = new acm.Certificate(this, "PortfolioCertificate", {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(zone)
    });

    const distribution = new cloudfront.Distribution(this, name("Distribution"), {
      certificate: certificate,
      domainNames: [props.domainName],
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      defaultBehavior: {
        // origin: new origins.HttpOrigin(fnUrl.url.replace("http://", ""))
        origin: new origins.S3Origin(bucket)
      },
      additionalBehaviors: {
        "/assets/*": {
          origin: new origins.S3Origin(bucket)
        }
      }
    });

    new route53.ARecord(this, name("ARecord"), {
      zone: zone,
      target: route53.RecordTarget.fromAlias(new targets.CloudFrontTarget(distribution))
    });

    new s3Deployment.BucketDeployment(this, name("BucketDeployment"), {
      sources: [s3Deployment.Source.asset(dist)],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"] // cache invalidation
    });
  }
}
