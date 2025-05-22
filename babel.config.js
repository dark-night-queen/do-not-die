module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        "babel-preset-expo",
        {
          jsxImportSource: "nativewind",
        },
      ],
      "nativewind/babel",
    ],

    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],

          alias: {
            "@/components": "./src/components",
            "@/constants": "./src/constants",
            "@/hooks": "./src/hooks",
            "@/providers": "./src/providers",
            "@/screens": "./src/screens",
            "@/store": "./src/store",
            "@/utils": "./src/utils",
            "@": "./",
            "tailwind.config": "./tailwind.config.js",
          },
        },
      ],
    ],
  };
};
