import { TCModel } from './TCModel.js';
/**
 * Main class for encoding and decoding a
 * TCF Transparency and Consent String
 */
export declare class TCString {
    /**
     * Decodes a string into a TCModel
     *
     * @param {string} encodedTCString - base64url encoded Transparency and
     * Consent String to decode - can also be a single or group of segments of
     * the string
     * @param {string} [tcModel] - model to enhance with the information.  If
     * none is passed a new instance of TCModel will be created.
     * @return {TCModel} - Returns populated TCModel
     */
    static decode(encodedTCString: string, tcModel?: TCModel): TCModel;
}
