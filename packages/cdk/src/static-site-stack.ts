import { Stack, StackProps, RemovalPolicy, CfnOutput } from "aws-cdk-lib";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import * as env from "./env.js";

export class StaticSiteStack extends Stack {
  publicBucket: Bucket;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.publicBucket = new Bucket(this, "www.ibg.run", {
      removalPolicy: RemovalPolicy.DESTROY,
      websiteIndexDocument: "index.html",
      publicReadAccess: true
    });

    new CfnOutput(this, "PublicBucketNameOutput", {
      value: this.publicBucket.bucketName,
      exportName: env.PUBLIC_BUCKET_OUTPUT_KEY
    });
  }
}
