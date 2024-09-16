import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from 'node:url';
import { Transform, pipeline } from 'node:stream';
import { promisify } from 'node:util';
import { UpperCaseTransform } from './transform.js';

const filePath = path.join(path.dirname(fileURLToPath(import.meta.url)), "text.txt");
const readStream = fs.createReadStream(filePath, { encoding: 'utf-8' });
const transformStream = new UpperCaseTransform(), pipe = promisify(pipeline);

(async function processFile() {
    try {
        await pipe(readStream, transformStream,
            new Transform({
                transform(chunk, encoding, callback) {
                    (async () => {
                        for (const char of chunk.toString()) {
                            process.stdout.write(char);
                            await new Promise(resolve => setTimeout(resolve, 100));
                        }
                        callback();
                    })();
                }
            })
        );
    } catch (err) { console.error('Ошибка при обработке файла:', err); }
})();