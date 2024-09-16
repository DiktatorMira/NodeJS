import fs from 'fs';
import path from "node:path";
import { fileURLToPath } from 'url';

const filename = fileURLToPath(import.meta.url), dirname = path.dirname(filename);
const readStream = fs.createReadStream(path.join(dirname, 'text.txt'), { encoding: 'utf-8' });
let delay = 0;

readStream.on('data', (chunk) => {
    for (const char of chunk) {
        setTimeout(() => {
            process.stdout.write(char);
        }, delay);
        delay += 100;
    }
});
readStream.on('end', () => {
    setTimeout(() => {
        console.log('\n\nЧтение файла завершено.');
    }, delay);
});
readStream.on('error', (err) => { console.error('\nОшибка чтения файла:', err); });