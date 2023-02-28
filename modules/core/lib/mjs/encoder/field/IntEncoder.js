import { DecodingError, } from '../../errors/index.js';
export class IntEncoder {
    static decode(value, numBits) {
        if (numBits !== value.length) {
            throw new DecodingError('invalid bit length');
        }
        return parseInt(value, 2);
    }
}
