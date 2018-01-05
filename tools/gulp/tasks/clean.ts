import { task } from 'gulp';
import * as del from 'del';

import { DIST_ROOT } from '../constants';

/** Removes the dist directory. */
task('clean', () => {
  return del(DIST_ROOT);
});
