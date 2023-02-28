export class BooleanEncoder {
  public static decode(value: string): boolean {

    // less operations than !!parseInt(value, 2)
    return value === '1';

  }

}
