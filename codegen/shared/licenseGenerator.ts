// Generates LICENSE.txt content and copyright headers for extension packages

/**
 * Returns the full GNU Affero General Public License v3 text
 * with Elder Swamp Club, Inc. as the copyright holder.
 */
export function generateLicense(): string {
  const year = new Date().getFullYear();
  return `Copyright (C) ${year} Elder Swamp Club, Inc.

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
`;
}

/**
 * Returns the AGPLv3 copyright header block for generated .ts model files.
 * Each line is prefixed with `// ` to form a TypeScript comment block.
 */
export function generateCopyrightHeader(): string {
  const year = new Date().getFullYear();
  return `// Swamp, an Automation Framework
// Copyright (C) ${year} Elder Swamp Club, Inc.
//
// This file is part of Swamp.
//
// Swamp is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License version 3
// as published by the Free Software Foundation, with the Swamp
// Extension and Definition Exception (found in the "COPYING-EXCEPTION"
// file).
//
// Swamp is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with Swamp.  If not, see <https://www.gnu.org/licenses/>.`;
}
