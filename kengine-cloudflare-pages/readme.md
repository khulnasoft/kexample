# Kengine Logger for Cloudflare Pages Functions

Easily add logs to your Cloudflare Pages Functions using Kengine Logger. Just import the package, create a logger, log messages, and don't forget to flush!

```javascript
import { KengineLogger } from "@khulnasoft/edge-logger"

export function onRequest(context) {
    const logger = new KengineLogger({
        apiKey: context.env.KENGINE_API_KEY,
        ctx: context,
        isLocalDev: context.env.IS_LOCAL
    })

    logger.info("Hello from the serverless world!")

    context.waitUntil(logger.flush());
    return new Response(JSON.stringify({
        message: "Hello from the serverless world!"
    }))
}
```
For more details, check out the [Kengine Logger Documentation](https://github.com/kengine/edge-logger). Happy logging!
