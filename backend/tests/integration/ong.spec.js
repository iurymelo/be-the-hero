const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });
  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new NOG', async () => {
    const response = await request(app)
      .post('/ongs')
      .send({
        name: "Associação Bom pra Bicho 2",
        email: "abpb@horm.com",
        whatsapp: "48991990919",
        city: "Araranguá",
        uf: "SC"
      });

    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
  })
});