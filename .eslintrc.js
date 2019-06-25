module.exports = {
  extends: ["airbnb", "plugin:jest/recommended"],
  plugins: ["jest", "react-hooks"],
  env: {
    browser: true,
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
};
