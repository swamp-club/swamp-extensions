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
} as const;
