import { App } from "aws-cdk-lib";
import * as env from "./env.js";
import { StaticSiteStack } from "./static-site-stack.js";

const app = new App();

async function run() {
  return new StaticSiteStack(app, env.STATIC_SITE_STACK_NAME, {
    env: {
      account: env.AWS_ACCOUNT,
      region: env.AWS_REGION
    }
  });
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
