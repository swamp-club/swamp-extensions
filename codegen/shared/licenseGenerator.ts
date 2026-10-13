// Generates LICENSE.txt content and copyright headers for extension packages

/**
 * SPDX license expression every first-party extension declares in its
 * manifest. It must match the notice generateLicense() writes.
 */
export const FIRST_PARTY_LICENSE = "AGPL-3.0-or-later";

/**
 * Returns the AGPL-3.0-or-later license notice for LICENSE.txt, with
 * Elder Swamp Club, Inc. as the copyright holder.
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
 * Returns the AGPL-3.0-or-later copyright header block for generated .ts
 * model files: the same notice as LICENSE.txt. Each line is prefixed with
 * `// ` to form a TypeScript comment block.
 */
export function generateCopyrightHeader(): string {
  const year = new Date().getFullYear();
  return `// Copyright (C) ${year} Elder Swamp Club, Inc.
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
// along with this program.  If not, see <https://www.gnu.org/licenses/>.`;
}
