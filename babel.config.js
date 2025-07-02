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
            "@/lib": "./src/lib",
            "@/components": "./src/lib/components",
            "@/constants": "./src/lib/constants",
            "@/hooks": "./src/lib/hooks",
            "@/providers": "./src/lib/providers",
            "@/screens": "./src/screens",
            "@/store": "./src/lib/store",
            "@/utils": "./src/lib/utils",
            "@": "./",
            "tailwind.config": "./tailwind.config.js",
          },
        },
      ],
    ],
  };
};
