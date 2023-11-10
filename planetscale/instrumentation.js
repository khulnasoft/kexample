

const { KengineSDK } = require('@khulnasoft/node-opentelemetry');
const { default: MySQL2Instrumentation } = require('@opentelemetry/instrumentation-mysql2');

console.log('Starting instrumentation example')
const sdk = new KengineSDK({
    serverless: true,
    // collectorUrl: 'https://otel.kengine.cc/v1',
    instrumentations: [
        new MySQL2Instrumentation({
            responseHook: (span, response) => {
                console.log(response)
            }
        })
    ]
})

sdk.start();