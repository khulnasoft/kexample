import { BaselimeLogger } from '@baselime/edge-logger'

export const handle = async ({
  event,
  resolve,
}: {
  event: any
  resolve: any
}) => {
  const baselimeApiKey = String(event.platform?.env?.BASELIME_API_KEY)

  const context = event.platform?.context || {
    waitUntil: async (cb: Promise<void>) => {
      await cb
    },
    passThroughOnException: () => {},
  }
  const logger = new BaselimeLogger({
    service: 'sverdle',
    namespace: event.request.url,
    apiKey: baselimeApiKey,
    isLocalDev: !event.platform,
    ctx: context,
  })

  event.logger = logger

  const result = await resolve(event)

  context.waitUntil(logger.flush())
  return result
}
