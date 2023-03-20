const request = require('supertest');
const app = require('./index.js');

describe('GET /parse', () => {
  it('returns 200 with valid youtube search URL', async () => {
    const res = await request(app)
      .get('/parse?url=https://www.google.com/search?q=u2+boy+full+album+playlist');

    expect(res.statusCode).toEqual(200);
    expect(res.type).toEqual('text/html');
    const resJson = JSON.parse(res.text);
    expect(resJson.videoUrl).toMatch(/^https:\/\/www\.youtube\.com\/watch\?v=.*/);
  }, 20000);

});