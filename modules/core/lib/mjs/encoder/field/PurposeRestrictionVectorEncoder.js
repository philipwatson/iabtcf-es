import { BitLength } from '../BitLength.js';
import { BooleanEncoder } from './BooleanEncoder.js';
import { DecodingError } from '../../errors/index.js';
import { IntEncoder } from './IntEncoder.js';
import { PurposeRestrictionVector, PurposeRestriction } from '../../model/index.js';
export class PurposeRestrictionVectorEncoder {
    static decode(encodedString) {
        let index = 0;
        const vector = new PurposeRestrictionVector();
        const numRestrictions = IntEncoder.decode(encodedString.substr(index, BitLength.numRestrictions), BitLength.numRestrictions);
        index += BitLength.numRestrictions;
        for (let i = 0; i < numRestrictions; i++) {
            // First is purpose ID
            const purposeId = IntEncoder.decode(encodedString.substr(index, BitLength.purposeId), BitLength.purposeId);
            index += BitLength.purposeId;
            // Second Restriction Type
            const restrictionType = IntEncoder.decode(encodedString.substr(index, BitLength.restrictionType), BitLength.restrictionType);
            index += BitLength.restrictionType;
            const purposeRestriction = new PurposeRestriction(purposeId, restrictionType);
            // Num Entries (number of vendors)
            const numEntries = IntEncoder.decode(encodedString.substr(index, BitLength.numEntries), BitLength.numEntries);
            index += BitLength.numEntries;
            for (let j = 0; j < numEntries; j++) {
                const isARange = BooleanEncoder.decode(encodedString.substr(index, BitLength.anyBoolean));
                index += BitLength.anyBoolean;
                const startOrOnlyVendorId = IntEncoder.decode(encodedString.substr(index, BitLength.vendorId), BitLength.vendorId);
                index += BitLength.vendorId;
                if (isARange) {
                    const endVendorId = IntEncoder.decode(encodedString.substr(index, BitLength.vendorId), BitLength.vendorId);
                    index += BitLength.vendorId;
                    if (endVendorId < startOrOnlyVendorId) {
                        throw new DecodingError(`Invalid RangeEntry: endVendorId ${endVendorId} is less than ${startOrOnlyVendorId}`);
                    }
                    for (let k = startOrOnlyVendorId; k <= endVendorId; k++) {
                        vector.add(k, purposeRestriction);
                    }
                }
                else {
                    vector.add(startOrOnlyVendorId, purposeRestriction);
                }
            }
        }
        vector.bitLength = index;
        return vector;
    }
}
