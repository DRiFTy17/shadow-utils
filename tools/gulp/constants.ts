import { resolve, join } from 'path';

export const ROOT = resolve(__dirname, '../../');
export const SRC_ROOT = join(ROOT, 'src');
export const LIB_ROOT = join(SRC_ROOT, 'lib');
export const DIST_ROOT = join(ROOT, 'dist');
