import { src, dest } from 'gulp';
import { SrcOptions } from 'vinyl-fs';

/** 
 * Copies file(s) to the specified output dir(s).
 * @param {string | string[]} filePath The path or array of paths to the file(s) to be copied.
 * @param {string | string[]} outputDir The path or array of paths to the output dir(s).
 */
export function copyFiles(filePaths: string | string[], outputDir: string | string[], srcOptions?: SrcOptions): NodeJS.ReadWriteStream {
  let stream = src(filePaths, srcOptions);
  const destDirs = outputDir instanceof Array ? outputDir : [outputDir];
  destDirs.forEach(dir => stream = stream.pipe(dest(dir)));
  return stream;
}
