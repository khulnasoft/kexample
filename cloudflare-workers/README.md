# Cloudflare Workers example

## Getting Started

1. Create a new Workers project: `npm create cloudflare@latest`

2. Pick a project type (this example used `"Hello World" Worker`)

3. Add a Kengine API key as a secret: `npx wrangler secret put KENGINE_API_KEY`

4. Copy over [src/kengine.ts](src/kengine.ts) and [src/index.ts](src/index.ts) from this repo.

5. Update the initialized `Kengine` instance in [src/index.ts](src/index.ts) with your project details.

6. Re-deploy with `npm run deploy` - you should start seeing request logs in your Kengine project!
