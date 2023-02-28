import { IntEncoder, } from './IntEncoder.js';
import { DecodingError, } from '../../errors/index.js';
export class LangEncoder {
    static decode(value, numBits) {
        let retr;
        // is it an even number of bits? we have to divide it
        if (numBits === value.length && !(value.length % 2)) {
            const ASCII_START = 65;
            const mid = value.length / 2;
            const firstLetter = IntEncoder.decode(value.slice(0, mid), mid) + ASCII_START;
            const secondLetter = IntEncoder.decode(value.slice(mid), mid) + ASCII_START;
            retr = String.fromCharCode(firstLetter) + String.fromCharCode(secondLetter);
        }
        else {
            throw new DecodingError('invalid bit length for language');
        }
        return retr;
    }
}
