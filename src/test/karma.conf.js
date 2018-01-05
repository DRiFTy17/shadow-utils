module.exports = config => {
  const configuration = {
    basePath: '',

    frameworks: ['jasmine', 'karma-typescript', 'fixture'],

    plugins: [
      require('karma-jasmine'),
      require('karma-typescript'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-spec-reporter'),
      require('karma-fixture'),
      require('karma-html2js-preprocessor')
    ],

    files: [
      '../../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js',
      '../../node_modules/@webcomponents/webcomponentsjs/webcomponents-lite.js',
      { pattern: 'spec/**/*.ts' },
      { pattern: 'web-components/**/*.ts' },
      { pattern: 'spec/fixtures/**/*.html' },
      { pattern: '../lib/**/*.ts' }
    ],

    exclude: [
      'coverage/**/*'
    ],

    preprocessors: {
      'spec/**/*.ts': ['karma-typescript'],
      'web-components/**/*.ts': ['karma-typescript'],
      'spec/fixtures/**/*.html': ['html2js'],
      '../lib/**/*.ts': ['karma-typescript']
    },

    reporters: ['spec', 'karma-typescript'],

    karmaTypescriptConfig: {
      tsconfig: 'tsconfig-test.json',
      reports: {
        html: {
          directory: "src/test/coverage",
          subdirectory: "html-report"
        }
      },
      coverageOptions: {
        exclude: [
          /test\-.*\.ts$/i,
          /\.spec\.ts$/i,
          /index\.ts$/i
        ]
      }
    },

    specReporter: {
      showSpecTiming: true,
      failFast: false
    },

    customLaunchers: {
      Chrome_travis_ci: {
          base: 'Chrome',
          flags: ['--no-sandbox']
      }
    },

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox'],
    singleRun: false,
    concurrency: Infinity
  };

  if (process.env.TRAVIS) {
      configuration.browsers = ['Chrome_travis_ci', 'Firefox'];
  }

  config.set(configuration);
};
