const path = require('path');
const webpack = require('webpack');
const fs = require('fs');

const directoryPath = path.join(__dirname, '../src/assets/icons');

function getIconsNames() {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, function (err, files) {
      files = files.map(file => file.replace('.vue', ''));
      resolve(files);
    });
  });
}

module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.sass$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            resources: [
              './src/assets/__colors.sass'
            ]
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });
    
    config.module.rules.push({
      test: /\.(png|jpg|gif|svg)$/,
      use: [
        {
          loader: 'raw-loader',
          options: {},
        },
      ],
    });

    const icons = await getIconsNames();
    config.plugins.push(new webpack.DefinePlugin({
      ICONS_LIST: JSON.stringify(icons),
    }));

    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "../src/"),
    };


    return config;
  },
  "staticDirs": ['../public'],
  "stories": [
    "../src/**/stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-jest",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
  ],
  "framework": "@storybook/vue3"
}