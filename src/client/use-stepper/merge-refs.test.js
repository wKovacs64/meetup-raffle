import React from 'react';
import mergeRefs from './merge-refs';

describe('mergeRefs', () => {
  it('merges multiple React ref objects', () => {
    const input = React.createElement('input', { type: 'text' });
    const ref1 = React.createRef();
    const ref2 = React.createRef();

    mergeRefs(ref1, ref2)(input);

    expect(ref1.current).toBe(input);
    expect(ref2.current).toBe(input);
  });

  it('merges React ref objects and function refs', () => {
    const input = React.createElement('input', { type: 'text' });
    const ref1 = React.createRef();
    const ref2 = jest.fn();

    mergeRefs(ref1, ref2)(input);

    expect(ref1.current).toBe(input);
    expect(ref2).toHaveBeenCalledWith(input);
  });

  it("doesn't crash for invalid refs", () => {
    const input = React.createElement('input', { type: 'text' });
    const ref1 = null;
    const ref2 = {};

    mergeRefs(ref1, ref2)(input);
  });
});
