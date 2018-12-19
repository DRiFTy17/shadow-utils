import { join } from 'path';
import { task, TaskFunction } from 'gulp';
import * as runSequence from 'run-sequence';

import { ROOT, DIST_ROOT, LIB_ROOT } from '../constants';
import { copyFiles } from '../utils/file-utils';

/** Builds the package. */
task('build', (done: TaskFunction) => {
  return runSequence(
    'clean',
    'lint',
    'compile:commonjs',
    'compile:esm5',
    'prepare',
    done
  );
});

/** Prepares the npm package by copying necessary files. */
task('prepare', () => {
  const fileGlobs = [
    join(ROOT, 'LICENSE'),
    join(ROOT, 'README.md'),
    join(LIB_ROOT, 'package.json')
  ];
  return copyFiles(fileGlobs, DIST_ROOT);
});
