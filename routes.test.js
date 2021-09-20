const request = require('supertest');
const app = require('./app.js');

jest.mock('./util/generateToken', () => (jest.fn(() => 'my generated token')));

describe('Test the root path', () => {
    test('It should get response to the GET method', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
});

describe('Test the post tokenize request', () => {
    test('It should get the token  in response for account number', async () => {
        const response = await request(app)
                                .post('/tokenize')
                                .send({'input': ['4444-1111-4444-1111']})
                                .set('Content-Type', 'application/json')
                                .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toBe('my generated token');
    });
});

describe('Test the post detokenize request', () => {
    test('It should get the account number in response for token', async () => {
        const response = await request(app)
                                .post('/detokenize')
                                .send({'input': ['my generated token']})
                                .set('Content-Type', 'application/json')
                                .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.body[0]).toBe('4444-1111-4444-1111');
    });

    test('Token not found', async () => {
        const response = await request(app)
                                .post('/detokenize')
                                .send({'input': ['my generated token2']})
                                .set('Content-Type', 'application/json')
                                .set('Accept', 'application/json');

        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('[]');
    });
});