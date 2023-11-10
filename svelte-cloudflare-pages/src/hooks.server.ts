import { KengineLogger } from "@khulnasoft/edge-logger";


export const handle = async ({ event, resolve }: { event: any, resolve: any}) => {

    const kengineApiKey = String(event.platform?.env?.KENGINE_API_KEY);

    const context = event.platform?.context || { waitUntil: async (cb: Promise<void> ) => { await cb }, passThroughOnException: () => {} }
    const logger = new KengineLogger({
        service: 'sverdle',
        namespace: event.request.url,
        apiKey: kengineApiKey,
        isLocalDev: !event.platform,
        ctx: context
    });
    
    event.logger = logger
  
    const result = await resolve(event);

    context.waitUntil(logger.flush());
    return result
  };