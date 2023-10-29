import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class PortfolioStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const bucket = new cdk.aws_s3.Bucket(this, "PortfolioBucket");

    const cloudfront = new cdk.aws_cloudfront.Distribution(this, "PortfolioDistribution", {
      defaultBehavior: { origin: new cdk.aws_cloudfront_origins.S3Origin(bucket) }
    });

    console.log(cloudfront.distributionDomainName);
  }
}
