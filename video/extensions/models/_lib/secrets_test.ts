// Copyright (C) 2026 Elder Swamp Club, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

import { assertEquals } from "jsr:@std/assert@1.0.19";
import { secretKind } from "./secrets.ts";

Deno.test("secretKind flags credentials and leaves ordinary text alone", () => {
  const cases: [string, string, string | undefined][] = [
    ["AKIAABCDEFGHIJKLMNOP", "", "aws-key"],
    ["ghp_" + "a".repeat(36), "", "github-token"],
    ["sk-" + "x".repeat(24), "", "api-key"],
    ["xoxb-1234567890-abc", "", "slack-token"],
    ["AIza" + "B".repeat(35), "", "google-key"],
    ["eyJhbGciOiJIUzI1.eyJzdWIiOiIxMjM0", "", "jwt"],
    ["Xq7mZ2pL9vR4tK8wN3bH6yD1cF5gJ0sA", "", "high-entropy"],
    ["http://h/start#token=XvruSDbimQEQ", "", "assigned-secret"],
    ["hunter2hunter2", "password: hunter2hunter2", "assigned-secret"],
    ["3f2a9c1b7d4e5f60718293a4b5c6d7e8f9012345", "", undefined], // a commit hash
    ["123e4567-e89b-12d3-a456-426614174000", "", undefined], // a UUID
    ["extension", "token: extension", "assigned-secret"],
    ["hello", "say hello", undefined],
  ];
  for (const [word, line, want] of cases) {
    assertEquals(secretKind(word, line || word), want, word);
  }
});

Deno.test("secretKind honours the allow list", () => {
  assertEquals(
    secretKind("AKIAABCDEFGHIJKLMNOP", "", ["AKIAABCDEF"]),
    undefined,
  );
});
