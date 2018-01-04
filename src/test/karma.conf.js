module.exports = config => {
  config.set({
    basePath: '',

    frameworks: ['jasmine', 'karma-typescript', 'fixture'],

    plugins: [
      require('karma-jasmine'),
      require('karma-typescript'),
      require('karma-chrome-launcher'),
      require('karma-spec-reporter'),
      require('karma-fixture'),
      require('karma-html2js-preprocessor')
    ],

    files: [
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

    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    concurrency: Infinity
  });
};
