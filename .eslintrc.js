module.exports = {
  extends: ["airbnb", "plugin:jest/recommended"],
  plugins: ["jest"],
  env: {
    browser: true,
  },
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
  },
};
