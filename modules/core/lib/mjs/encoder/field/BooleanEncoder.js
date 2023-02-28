export class BooleanEncoder {
    static decode(value) {
        // less operations than !!parseInt(value, 2)
        return value === '1';
    }
}
