import { join } from "path";
import type { Construct } from "constructs";
import { Stack, StackProps } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3_deployment from "aws-cdk-lib/aws-s3-deployment";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as api from "aws-cdk-lib/aws-apigateway";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";

const dist = join(process.cwd(), "dist/client");
const name = (tag: string) => "Portfolio" + tag;

export class PortfolioStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, name("Bucket"));

    new s3_deployment.BucketDeployment(this, name("BucketDeployment"), {
      sources: [s3_deployment.Source.asset(dist)],
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

    new cloudfront.Distribution(this, name("Distribution"), {
      httpVersion: cloudfront.HttpVersion.HTTP2_AND_3,
      defaultBehavior: {
        origin: new origins.RestApiOrigin(gateway)
      }
    });
  }
}
