export declare class Base64Url {
    /**
     * Base 64 URL character set.  Different from standard Base64 char set
     * in that '+' and '/' are replaced with '-' and '_'.
     */
    private static DICT;
    private static REVERSE_DICT;
    /**
     * log2(64) = 6
     */
    private static BASIS;
    private static LCM;
    /**
     * decodes a base64url encoded bitfield string
     *
     * @static
     * @param {string} str - base64url encoded bitfield string to be decoded
     * @return {string} - bitfield string
     */
    static decode(str: string): string;
}
