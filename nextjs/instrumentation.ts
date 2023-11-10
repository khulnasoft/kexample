
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { KengineSDK } = await import('@khulnasoft/node-opentelemetry');

    const sdk = new KengineSDK({
      serverless: true
    });
    sdk.start();
  }
}