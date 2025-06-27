# Pizarra Backend

**Pizarra** es un backend creado con Node.js y Sequelize para una red social ligera, inspirada en Twitter/X, donde los usuarios pueden registrarse, publicar "pizarras" (posts), comentar, dar likes y seguir a otros usuarios.

## Tecnologías

[Node.js](Entorno de ejecución para JavaScript en el servidor. Permite construir aplicaciones backend rápidas y escalables.)

**Express**

**Sequelize ORM + MySQL**

**JWT para autenticación**

## Autenticación

**Ruta base:** `/api/user`

| Método | Ruta        | Descripción             |
| ------ | ----------- | ----------------------- |
| POST   | `/register` | Registrar nuevo usuario |
| POST   | `/login`    | Iniciar sesión          |

## Posts (Pizarras)

**Ruta base:** `/api/post`

| Método | Ruta                       | Descripción                      |
| ------ | -------------------------- | -------------------------------- |
| GET    | `/`                        | Obtener todos los posts          |
| GET    | `/user/username/:username` | Posts de un usuario por username |
| GET    | `/user/userid/:id`         | Posts de un usuario por ID       |
| POST   | `/`                        | Crear post (requiere auth)       |
| PUT    | `/:id`                     | Actualizar post propio           |
| DELETE | `/:id`                     | Eliminar post propio             |

### Likes

| Método | Ruta          | Descripción              |
| ------ | ------------- | ------------------------ |
| POST   | `/:id/like`   | Dar like a un post       |
| DELETE | `/:id/unlike` | Quitar like              |
| GET    | `/:id/likes`  | Obtener likes de un post |

## Comentarios

**Ruta base:** `/api/comment`

| Método | Ruta            | Descripción                    |
| ------ | --------------- | ------------------------------ |
| GET    | `/post/:postId` | Obtener comentarios de un post |
| POST   | `/:postId`      | Crear comentario (auth)        |
| PUT    | `/:id`          | Actualizar comentario propio   |
| DELETE | `/:id`          | Eliminar comentario propio     |

## Seguidores / Seguidos

**Ruta base:** `/api/follower`

### Por ID

| Método | Ruta              | Descripción                         |
| ------ | ----------------- | ----------------------------------- |
| POST   | `/:id/follow`     | Seguir a un usuario (auth)          |
| DELETE | `/:id/unfollow`   | Dejar de seguir a un usuario (auth) |
| GET    | `/:id/followings` | Obtener a quién sigue un usuario    |
| GET    | `/:id/followers`  | Obtener seguidores de un usuario    |

### Por Username

| Método | Ruta                             | Descripción                         |
| ------ | -------------------------------- | ----------------------------------- |
| GET    | `/username/:username/followers`  | Obtener seguidores por username     |
| GET    | `/username/:username/followings` | Obtener seguidos por username       |
| POST   | `/username/:username/follow`     | Seguir usuario por username (auth)  |
| DELETE | `/username/:username/unfollow`   | Dejar de seguir por username (auth) |

## Conexión con el Frontend

Este backend está diseñado para ser consumido por un frontend (como React, Vue o cualquier SPA). Todas las rutas protegidas requieren un token JWT en los headers de autorización:

```http
Authorization: Bearer <tu_token>
```

## Instalación y uso

```bash
git clone https://github.com/tu_usuario/pizarra-backend.git
cd pizarra-backend
npm install
npm run dev
```



## Rutas registradas en `index.js`

```js
app.use('/api/user', authRoutes);
app.use('/api/post', postRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/follower', followerRoutes);
```

---
