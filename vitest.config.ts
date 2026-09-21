import { defineConfig } from "vitest/config";

// vite.config.jsはserveでexamplesをrootにするので、テストは別の設定から読む
export default defineConfig({
  define: {
    VERSION: JSON.stringify("0.1.0-test"),
  },
  test: {
    globals: true,
    maxWorkers: "50%",
    coverage: {
      provider: "v8",
      reportsDirectory: "coverage",
      reporter: ["text", "lcov", "clover", "json-summary"],
      include: ["src/**/*.{js,jsx,ts,tsx}", "scripts/**/*.ts"],
      exclude: [
        "**/*.test.ts",
        // 読み込むだけでprocess.exitするので、CIのgenerate:checkで動かして確認する
        "scripts/generate.ts",
      ],
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
});
