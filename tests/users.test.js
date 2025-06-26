import request from 'supertest';
import app from '../index.js'


describe('POST /api/user/register', () => {
  /*  it('debería agregar un nuevo usuario', async () => {
   

    const newUser = {
      username: 'carlos18',
      password: 'abcdef',
      passwordrep:"abcdef"
    };

    const res = await request(app)
      .post('/api/user/register')
      .send(newUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('user created successfully');
  });  */

  it('debería fallar si el usuario ya existe en la base de datos', async () => {
   
    const newUser = {
      username: 'carlos18',
      password: 'abcdef',
      passwordrep:"abcdef"
    };

    const res = await request(app)
      .post('/api/user/register')
      .send(newUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('username already in use');
  }); 

  it('debería fallar si el username es muy corto', async () => {
   
    const newUser = {
      username: 'car',
      password: 'abcdef',
      passwordrep:"abcdef"
    };

    const res = await request(app)
      .post('/api/user/register')
      .send(newUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('user name or password must have at least 6 characters');
  }); 

  it('debería fallar si el password es muy corto', async () => {
   
    const newUser = {
      username: 'carlos4145',
      password: 'a',
      passwordrep:"a"
    };

    const res = await request(app)
      .post('/api/user/register')
      .send(newUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('user name or password must have at least 6 characters');
  }); 

  it('debería fallar si el password no coinciden', async () => {
   
    const newUser = {
      username: 'carlos4145',
      password: '789456',
      passwordrep:"gfgfhghfdf"
    };

    const res = await request(app)
      .post('/api/user/register')
      .send(newUser);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('passwords must match');
  }); 
 

});

