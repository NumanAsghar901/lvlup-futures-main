import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    // These pages were migrated from pixel-matched static templates. Their
    // raw image elements and public stylesheet links intentionally preserve
    // the original sizing and cascade until assets are migrated page by page.
    name: "legacy-static-template-compatibility",
    files: [
      "src/app/about/page.tsx",
      "src/app/affiliate/page.tsx",
      "src/app/contact/page.tsx",
      "src/app/elite/page.tsx",
      "src/app/evaluation/page.tsx",
      "src/app/faqs/page.tsx",
      "src/app/page.tsx",
      "src/app/rules/page.tsx",
      "src/app/layout.tsx",
      "src/components/Footer.tsx",
      "src/components/Header.tsx",
    ],
    rules: {
      "@next/next/no-img-element": "off",
      "@next/next/no-css-tags": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
