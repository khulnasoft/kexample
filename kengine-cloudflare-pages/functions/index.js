import { KengineLogger } from "@khulnasoft/edge-logger"

export function onRequest(context) {
    console.log(context.env.IS_LOCAL)
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
  