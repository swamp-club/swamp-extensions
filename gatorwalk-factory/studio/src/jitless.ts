// Swamp, an Automation Framework Copyright (C) 2026 System Initiative, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify it under the terms
// of the GNU Affero General Public License version 3 as published by the Free
// Software Foundation, with the Swamp Extension and Definition Exception (found in
// the "COPYING-EXCEPTION" file).
//
// Swamp is distributed in the hope that it will be useful, but WITHOUT ANY
// WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A
// PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License along
// with Swamp. If not, see <https://www.gnu.org/licenses/>.

// zod compiles object parsers with new Function unless told not to, after
// probing whether it may. The studio's CSP forbids eval, so the probe would
// log a violation on every load. This module is imported before the engine,
// so the setting is in place before any schema is built or parsed.

// The engine's own specifier, not the import map's name, so this is the
// zod instance the engine's schemas use.
import { z } from "npm:zod@4.3.6";

z.config({ jitless: true });
