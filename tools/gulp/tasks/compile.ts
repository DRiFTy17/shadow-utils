import { task, src, dest, TaskFunction } from 'gulp';
import * as gulpTypeScript from 'gulp-typescript';
import * as gulpSourcemaps from 'gulp-sourcemaps';
import * as merge from 'merge2';

import { ROOT, LIB_ROOT, DIST_ROOT } from '../constants';

/** Compiles all TypeScript and generates declaration files and source maps. */
task('compile', () => {
  const tsconfig = require(`${ROOT}/tsconfig.json`);
  const tsResult = src(`${LIB_ROOT}/**/*.ts`)
                    .pipe(gulpSourcemaps.init())
                    .pipe(gulpTypeScript(tsconfig.compilerOptions));

  return merge([
    // Declaration files
    tsResult.dts.pipe(dest(DIST_ROOT)),

    // JavaScript files
    tsResult.js.pipe(gulpSourcemaps.write()).pipe(dest(DIST_ROOT))
  ]);
});
