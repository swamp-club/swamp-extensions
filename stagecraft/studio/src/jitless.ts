// Copyright (C) 2026 System Initiative, Inc.
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

// zod compiles object parsers with new Function unless told not to, after
// probing whether it may. The studio's CSP forbids eval, so the probe would
// log a violation on every load. This module is imported before the engine,
// so the setting is in place before any schema is built or parsed.

// The engine's own specifier, not the import map's name, so this is the
// zod instance the engine's schemas use.
import { z } from "npm:zod@4.6.7";

z.config({ jitless: true });
