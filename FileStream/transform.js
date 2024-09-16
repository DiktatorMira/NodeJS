import { Transform } from 'node:stream';

export class UpperCaseTransform extends Transform {
    constructor(options) { super(options); }
    _transform(chunk, encoding, callback) {
        this.push(chunk.toString().toUpperCase());
        callback();
    }
}