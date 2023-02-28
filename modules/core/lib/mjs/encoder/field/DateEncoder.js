import { IntEncoder, } from './IntEncoder.js';
import { DecodingError, } from '../../errors/index.js';
export class DateEncoder {
    static decode(value, numBits) {
        if (numBits !== value.length) {
            throw new DecodingError('invalid bit length');
        }
        const date = new Date();
        date.setTime(IntEncoder.decode(value, numBits) * 100);
        return date;
    }
}
