import { join } from "path";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

const dist = join(process.cwd(), "dist");
const name = (tag: string) => "Portfolio" + tag;

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new cdk.aws_s3.Bucket(this, name("Bucket"), {
      accessControl: cdk.aws_s3.BucketAccessControl.PUBLIC_READ
    });

    new cdk.aws_s3_deployment.BucketDeployment(this, name("BucketDeployment"), {
      sources: [cdk.aws_s3_deployment.Source.asset(dist)],
      destinationBucket: bucket
    });

    new cdk.aws_cloudfront.Distribution(this, name("Distribution"), {
      httpVersion: cdk.aws_cloudfront.HttpVersion.HTTP2_AND_3,
      defaultBehavior: { origin: new cdk.aws_cloudfront_origins.S3Origin(bucket) }
    });
  }
}
