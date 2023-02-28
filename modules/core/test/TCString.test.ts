import {expect} from 'chai';
import {TCString} from '../src';

describe('TCString', (): void => {

  it('should decode', (): void => {
    const newModel = TCString.decode("");
    expect(newModel.purposeLegitimateInterests.has(1), 'newModel.purposeLegitimateInterests.has(1)').to.be.false;
  });
});
