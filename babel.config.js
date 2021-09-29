module.exports = {
  presets: [
    [
      "@babel/env",
      {
        targets: {
          browsers: "Chrome >= 74, Safari >= 13.1, iOS >= 13.3, Firefox >= 78, Edge >= 79",
          node: 12,
        },
      },
    ],
    "@babel/preset-typescript",
  ],
}
