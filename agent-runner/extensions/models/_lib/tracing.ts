import { trace } from "npm:@opentelemetry/api@1.9.0";

const TRACER_NAME = "@swamp/agent-runner";

export function getTracer() {
  return trace.getTracer(TRACER_NAME);
}

export const Attr = {
  PROVIDER: "agent_runner.provider",
  VERSION: "agent_runner.cli_version",
  MODEL: "agent_runner.model",
  EFFORT: "agent_runner.effort",
  METHOD: "agent_runner.method",
  VERDICT: "agent_runner.verdict",
  HIGHEST_SEVERITY: "agent_runner.highest_severity",
  EXIT_CODE: "agent_runner.exit_code",
  SESSION_ID: "agent_runner.session_id",
  USAGE_MODEL: "agent_runner.usage.model",
  INPUT_TOKENS: "agent_runner.usage.input_tokens",
  OUTPUT_TOKENS: "agent_runner.usage.output_tokens",
  CACHE_READ_TOKENS: "agent_runner.usage.cache_read_tokens",
  CACHE_WRITE_TOKENS: "agent_runner.usage.cache_write_tokens",
  REASONING_OUTPUT_TOKENS: "agent_runner.usage.reasoning_output_tokens",
  COST_USD: "agent_runner.usage.cost_usd",
  NUM_TURNS: "agent_runner.usage.num_turns",
  DURATION_MS: "agent_runner.usage.duration_ms",
  DURATION_API_MS: "agent_runner.usage.duration_api_ms",
} as const;
