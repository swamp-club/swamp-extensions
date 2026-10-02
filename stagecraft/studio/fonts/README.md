# Studio fonts

The latin subsets of the studio's three families, in the weights the page uses,
copied from the npm packages below. All three are under the SIL Open Font
License 1.1; each family's licence is beside its files.

| Family         | Package                            | Weights            |
| -------------- | ---------------------------------- | ------------------ |
| Chakra Petch   | `@fontsource/chakra-petch@5.3.0`   | 400, 500, 600, 700 |
| JetBrains Mono | `@fontsource/jetbrains-mono@5.3.0` | 400, 500, 700      |
| Orbitron       | `@fontsource/orbitron@5.3.0`       | 500, 700, 900      |

They are the fonts swamp-club uses. The page bundles them because its CSP
(`default-src 'self'`) forbids loading them from a font CDN.
