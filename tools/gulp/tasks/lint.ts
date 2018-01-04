import { join } from 'path';
import { task, src } from 'gulp';

const gulpTsLint = require('gulp-tslint');
import { ROOT } from '../constants';

/** Lints all TypeScript files. */
task('lint', () => {
  return src([
    'src/**/*.ts',
    'tools/**/*.ts'
  ])
  .pipe(gulpTsLint({
      configuration: join(ROOT, 'tslint.json'),
      formatter: 'verbose'
  }))
  .pipe(gulpTsLint.report({
      reportLimit: 10
  }));
});
