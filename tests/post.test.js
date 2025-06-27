import request from 'supertest';
import app from '../index.js'

describe('GET /api/post', () =>{
    
    it("debería traer todos los post de la base de datos", async ()=>{
        const res = await request(app)
            .get('/api/post');
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBe('success');
            expect(res.body.message).toBe('posts obtained');
            expect(Array.isArray(res.body.posts)).toBe(true);
            expect(res.body.posts.length).toBeGreaterThan(0);
    });
});

describe('DELETE /api/post', () =>{
    
    it('debería fallar si no se envía token en una ruta protegida', async () => {
    const res = await request(app)
        .delete('/api/post') 
        .send({ content: 'Post sin token' }); 

        expect(res.statusCode).toBe(401); 
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('token not provided');
    });
});

describe('POST /api/post', () => {
  
    it('debería fallar si no se envía token en una ruta protegida', async () => {
    const res = await request(app)
        .post('/api/post') 
        .send({ content: 'Post sin token' }); 

        expect(res.statusCode).toBe(401); 
        expect(res.body.status).toBe('error');
        expect(res.body.message).toBe('token not provided');
    });


  /* it('debería agregar un Post con token válido', async () => {
    const newContent = {
      content: 'Estoy aprendiendo a programar',
    };

    const token = "Ingresa un token generado por JWT aqui"
    const res = await request(app)
      .post('/api/post')
      .set('Authorization', `Bearer ${token}`)
      .send(newContent);

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.message).toBe('post created successfully');
    expect(res.body.post).toBeDefined();
    expect(res.body.post).toHaveProperty('id');
    expect(res.body.post).toHaveProperty('user_id');
    expect(res.body.post).toHaveProperty('content', 'Estoy aprendiendo a programar');
    expect(res.body.post).toHaveProperty('createdAt');
    expect(res.body.post).toHaveProperty('updatedAt');
  }); */
  
});