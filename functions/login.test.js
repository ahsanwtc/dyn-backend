const { makeHandler } = require('./login');

const loginMock = jest
  .fn()
  .mockReturnValue({ token: 'asdasdasda' });

const handler = makeHandler(loginMock);

describe('Login endpoint', () => {
  describe('when invalid body is passed', () => {
    it('should return 400', async () => {
      const body = JSON.stringify({});
      const response = await handler({ body });
      
      expect(response.statusCode).toBe(400);
    });
  });

  describe('when valid body is passed', () => {

    it('should return 200', async () => {
      const body = JSON.stringify({ email: 'as@as.com', password: 'asdasd' });
      const response = await handler({ body });
      
      expect(response.statusCode).toBe(200);
    });
  });
});