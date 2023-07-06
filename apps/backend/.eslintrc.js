module.exports = {
  extends: ["@sanity/eslint-config-studio"],
  parserOptions: {
    project: ["tsconfig.json"],
    tsconfigRootDir: __dirname,
  }
}
