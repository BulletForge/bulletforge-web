module.exports = {
  parser: "babel-eslint",
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
    "jsx-a11y/label-has-associated-control": [ 2, {
      "controlComponents": ["ArchiveUploader"],
    }],
    "jsx-a11y/label-has-for": "off",
  },
};
