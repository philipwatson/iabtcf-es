import {Vector} from '../../model/index.js';
import {BitLength} from '../index.js';
import {IntEncoder} from './IntEncoder.js';
import {BooleanEncoder} from './BooleanEncoder.js';
import {FixedVectorEncoder} from './FixedVectorEncoder.js';
import {VectorEncodingType} from './VectorEncodingType.js';
import {DecodingError} from '../../errors/index.js';

export class VendorVectorEncoder {
  public static decode(value: string, version?: number): Vector {

    let vector: Vector;
    let index = 0;
    const maxId: number = IntEncoder.decode(value.substr(index, BitLength.maxId), BitLength.maxId);
    index += BitLength.maxId;
    const encodingType: VectorEncodingType = IntEncoder.decode(value.charAt(index), BitLength.encodingType);
    index += BitLength.encodingType;

    /**
     * Range is handled in batches so we'll need a different decoding scheme
     */
    if (encodingType === VectorEncodingType.RANGE) {

      vector = new Vector();

      if (version === 1) {

        if (value.substr(index, 1) === '1') {

          throw new DecodingError('Unable to decode default consent=1');

        }

        // jump over the default encoding
        index++;

      }

      const numEntries: number = IntEncoder.decode(value.substr(index, BitLength.numEntries), BitLength.numEntries);

      index += BitLength.numEntries;

      // loop through each group of entries
      for (let i = 0; i < numEntries; i ++) {

        // Ranges can represent a single id or a range of ids.
        const isIdRange: boolean = BooleanEncoder.decode(value.charAt(index));

        index += BitLength.singleOrRange;

        /**
         * regardless of whether or not it's a single entry or range, the next
         * set of bits is a vendor ID
         */
        const firstId: number = IntEncoder.decode(value.substr(index, BitLength.vendorId), BitLength.vendorId);

        index += BitLength.vendorId;

        // if it's a range, the next set of bits is the second id
        if (isIdRange) {

          const secondId: number = IntEncoder.decode(value.substr(index, BitLength.vendorId), BitLength.vendorId);

          index += BitLength.vendorId;

          // we'll need to set or unset all the vendor ids between the first and second
          for (let j = firstId; j <= secondId; j++) {

            vector.set(j);

          }

        } else {

          vector.set(firstId);

        }

      }

    } else {

      const bitField = value.substr(index, maxId);

      index += maxId;
      vector = FixedVectorEncoder.decode(bitField, maxId);

    }

    vector.bitLength = index;

    return vector;

  }
}
