import { join } from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

const name = "Portfolio";
const dist = join(process.cwd(), "dist");

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new cdk.aws_s3.Bucket(this, name);

    new cdk.aws_s3_deployment.BucketDeployment(this, name, {
      sources: [cdk.aws_s3_deployment.Source.asset(dist)],
      destinationBucket: bucket
    });

    new cdk.aws_cloudfront.Distribution(this, name, {
      httpVersion: cdk.aws_cloudfront.HttpVersion.HTTP2_AND_3,
      defaultBehavior: { origin: new cdk.aws_cloudfront_origins.S3Origin(bucket) }
    });
  }
}
