const { AsciiToBinary, BinaryToAscii } = require('./../converter');

describe('Flex Server Test [Converter]', () => {
  beforeEach(() => {});
  afterEach(() => {});

  test('Convert Binary To ASCII', () => {
    expect(BinaryToAscii('testingdata')).toBe('dGVzdGluZ2RhdGE=');
  });
  test('Convert ASCII To Binary', () => {
    expect(AsciiToBinary('dGVzdGluZ2RhdGE')).toBe('testingdata');
  });
});
