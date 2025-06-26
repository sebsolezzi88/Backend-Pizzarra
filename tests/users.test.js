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

describe('POST /api/user/login', () => {
  it('debería fallar si el usuario no esta registrado', async () => {
   
    const user = {
      username: 'unUsuarioNuevo',
      password: 'abcdef',
    };

    const res = await request(app)
      .post('/api/user/login')
      .send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('username not found');
  }); 

  it('debería fallar si no se envias username o password', async () => {
   
    const user = {
      username: 'unUsuarioNuevo',
      password: '',
    };

    const res = await request(app)
      .post('/api/user/login')
      .send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('username or password required');
  }); 

  it('debería fallar si el usuario esta registrado pero el password es incorrecto', async () => {
   
    const user = {
      username: 'marcelaUser',
      password: 'unnuevopassword',
    };

    const res = await request(app)
      .post('/api/user/login')
      .send(user);

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('error');
    expect(res.body.message).toBe('invalid credentials');
  }); 
  
  it('debería regresar el token si el usuario existe y el password es correcto', async () => {
   
    const user = {
      username: 'marcelaUser',
      password: '123456',
    };

    const res = await request(app)
      .post('/api/user/login')
      .send(user);

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('success');
    expect(res.body).toHaveProperty('token'); //esperar que haya una propiedad token

    // Validar que parezca un JWT (tres partes separadas por puntos)
    expect(res.body.token).toMatch(/^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/);
  }); 
});