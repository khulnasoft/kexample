import type { KengineLogger } from '@khulnasoft/edge-logger';

export async function load({ logger }: { logger: KengineLogger }) {
   
    logger.info("Hello from page.server.ts")

    return {
        data: Math.random(),
        message: "hello"
    };
}
