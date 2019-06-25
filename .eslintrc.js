module.exports = {
  extends: ["airbnb", "plugin:jest/recommended"],
  plugins: ["jest", "react-hooks"],
  settings: {
    "import/resolver": {
      node: {
        moduleDirectory: ["node_modules", "src/"]
      }
    }
  },
  env: {
    browser: true,
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
};
