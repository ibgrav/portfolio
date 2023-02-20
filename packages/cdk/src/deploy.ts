import { join } from "path";
import { $ } from "zx";
import * as env from "./env.js";

const ts = Date.now();

console.log(JSON.stringify(env, null, 2));

if (!env.AWS_ACCOUNT || !env.AWS_REGION || !env.AWS_PROFILE) {
  console.error("MISSING AWS VARIABLES");
  process.exit(1);
}

await $`pnpm -F site build`;

await $`cdk --profile ${env.AWS_PROFILE} bootstrap aws://${env.AWS_ACCOUNT}/${env.AWS_REGION}`;

await $`cdk  --profile ${env.AWS_PROFILE} deploy`;

const BUCKET_NAME = await $`aws  --profile ${env.AWS_PROFILE} cloudformation describe-stacks \
  --output text \
  --stack-name ${env.STATIC_SITE_STACK_NAME} \
  --query "Stacks[0].Outputs[?ExportName=='${env.PUBLIC_BUCKET_OUTPUT_KEY}'].OutputValue"`;

const siteDistPath = join(process.cwd(), "../site/dist");

await $`aws --profile ${env.AWS_PROFILE} s3 sync ${siteDistPath} s3://${BUCKET_NAME}/${env.BRANCH}/`;

console.log("\nDEPLOYED IN", (Date.now() - ts) / 1000, "seconds");
