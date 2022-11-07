import { HelloMiddleware } from './hello.middleware';

describe('HelloMiddleware', () => {
  it('should be defined', () => {
    expect(new HelloMiddleware()).toBeDefined();
  });
});
