import { join } from 'path';
import { task, src, dest } from 'gulp';
import * as gulpTypeScript from 'gulp-typescript';
import * as gulpSourcemaps from 'gulp-sourcemaps';
import * as merge from 'merge2';

import { ROOT, LIB_ROOT, DIST_ROOT } from '../constants';

/** Compiles all TypeScript and generates declaration files and source maps. */
task('compile:commonjs', () => {
  const tsconfig = require(`${ROOT}/tsconfig.json`);
  tsconfig.compilerOptions.target = 'es5';
  tsconfig.compilerOptions.module = 'commonjs';
  tsconfig.compilerOptions.declaration = false;

  const tsResult = src(`${LIB_ROOT}/**/*.ts`)
                    .pipe(gulpSourcemaps.init())
                    .pipe(gulpTypeScript(tsconfig.compilerOptions));

  const outDir = join(DIST_ROOT, 'commonjs');
  return tsResult.js.pipe(gulpSourcemaps.write(outDir, { sourceMappingURL: (file: any) => file.basename + '.map' } as any)).pipe(dest(outDir));
});

/** Compiles all TypeScript and generates declaration files and source maps. */
task('compile:esm5', () => {
  const tsconfig = require(`${ROOT}/tsconfig.json`);
  tsconfig.compilerOptions.target = 'es5';
  tsconfig.compilerOptions.module = 'es2015';
  tsconfig.compilerOptions.declaration = true;

  const tsResult = src(`${LIB_ROOT}/**/*.ts`)
                    .pipe(gulpSourcemaps.init())
                    .pipe(gulpTypeScript(tsconfig.compilerOptions));

  const outDir = join(DIST_ROOT, 'esm5');
  const typingsDir = join(DIST_ROOT, 'typings');

  return merge([
    // Declaration files
    tsResult.dts.pipe(dest(typingsDir)),

    // JavaScript files
    tsResult.js.pipe(gulpSourcemaps.write(outDir, { sourceMappingURL: (file: any) => file.basename + '.map' } as any)).pipe(dest(outDir))
  ]);
});
