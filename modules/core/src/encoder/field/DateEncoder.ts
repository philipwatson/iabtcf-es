import {
  IntEncoder,
} from './IntEncoder.js';
import {
  DecodingError,
} from '../../errors/index.js';

export class DateEncoder {
  public static decode(value: string, numBits: number): Date {

    if (numBits !== value.length) {

      throw new DecodingError('invalid bit length');

    }

    const date: Date = new Date();

    date.setTime(IntEncoder.decode(value, numBits) * 100);

    return date;

  }

}
