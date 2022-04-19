describe('Not Method', () => {
  it('should basic user - not', () => {
    expect(1 + 1).toEqual(2);
    expect('developer').toEqual('developer');
    expect({name: 'developer'}).not.toEqual({name: 'developr'});
  });
});

describe('Match - regex', () => {
  it('should basic user - toMatch', () => {
    expect('developer').toMatch(/\w+/);
  });
});

export {};
