const { SimpleSpanProcessor, ConsoleSpanExporter } = require("@opentelemetry/sdk-trace-base");
const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
const { AwsLambdaInstrumentation } = require('@opentelemetry/instrumentation-aws-lambda');
const { registerInstrumentations } = require('@opentelemetry/instrumentation');
const { getNodeAutoInstrumentations } = require("@opentelemetry/auto-instrumentations-node");
const { OTLPTraceExporter } = require("@opentelemetry/exporter-otlp-http");

const provider = new NodeTracerProvider();

// Send to the Kengine Otel Collector if you have an account
if (process.env.KENGINE_API_KEY) {
  provider.addSpanProcessor(
    new SimpleSpanProcessor(
      new OTLPTraceExporter({
        url: 'https://otel.kengine.khulnasoft.com/',
        headers: {
          Authorization: process.env.KENGINE_API_KEY
        }
      })
    )
  );
} else {
  // Otherwise, send to the console
  provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
}

provider.register();

registerInstrumentations({
  instrumentations: [
    getNodeAutoInstrumentations(),
    new AwsLambdaInstrumentation({
      requestHook: (span, { event, context }) => {
        span.setAttribute('cloud.region', process.env.AWS_REGION);
      },
      disableAwsContextPropagation: true
    })
  ],
});
