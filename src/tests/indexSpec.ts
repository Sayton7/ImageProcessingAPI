import supertest from 'supertest';
import app from '../index';

const request = supertest(app);

describe('Testing endpoints', () => {
  it('status of an ok request', async () => {
    const response = await request.get(
      '/resize/images?name=fjord&width=100&height=100'
    );
    expect(response.status).toBe(200);
  });

  it('status of a bad request, missing data', async () => {
    const response = await request.get('/resize/images?width=100&height=100');
    expect(response.status).toBe(400);
  });

  it('status of a bad request, invalid width or height', async () => {
    const response = await request.get('/resize/images?width=1x&height=100');
    expect(response.status).toBe(400);
  });

  it('status of a bad request, using 0 for width or height', async () => {
    const response = await request.get('/resize/images?width=0&height=100');
    expect(response.status).toBe(400);
  });

  it('status of a not found request', async () => {
    const response = await request.get(
      '/resize/images?name=x&width=100&height=100'
    );
    expect(response.status).toBe(404);
  });
});
