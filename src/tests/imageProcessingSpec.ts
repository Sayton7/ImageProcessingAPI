import processImage from '../utils/imageProcessing';

describe('Testing image processing', () => {
  it('should process an image', () => {
    expect(async () => {
      await processImage('fjord', '100', '100');
    }).not.toThrow();
  });
});
