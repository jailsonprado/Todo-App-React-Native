export function add(x: number, y: number) {
  return x + y;
}

describe('calculator', () => {
  it('should add  number', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
