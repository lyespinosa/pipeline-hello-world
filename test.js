const request = require('supertest');
const express = require('express');

const app = express();
app.get('/api/v1/welcome', (req, res) => {
    res.status(200).send('Hola a las pipelains');
});

describe('GET /api/v1/welcome', () => {
    it('Todo correcto', (done) => {
        request(app)
            .get('/api/v1/welcome')
            .expect('Hola a las pipelains', done);
    });
});
