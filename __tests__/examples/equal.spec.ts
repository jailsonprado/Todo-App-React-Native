describe('Igualdade', () => {
  it('should basic user - toEqual', () => {
    expect(1 + 1).toEqual(2);
    expect('developer').toEqual('developer');
    expect({name: 'developer'}).toEqual({name: 'developer'});
  });

  it('should basic user - toBe', () => {
    expect(1 + 1).toBe(2);
    expect('developer').toBe('developer');
    expect({name: 'developer'}).toEqual({name: 'developer'});
  });
});

export {};
