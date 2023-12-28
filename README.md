# Práctica 5 - API GraphQL Gestor de Cómics
Se utilizarán tres tipos principales: Usuario, Comic y Colección de Comics.

# Enlace al Deno Deploy

https://apsi-p5-esotog.deno.dev

# Configuración

Crea un archivo .env en el directorio raíz del proyecto y especifica la URL de conexión de tu base de datos MongoDB de la siguiente manera:

```env
MONGO_URL=tu_url_de_conexion_mongodb
```

## Tipos de Datos:
### 1. Usuario:
   - Atributos:
     * id
     * nombre
     * correo electronico
     * colección de comics
    
   - Objetivo: Gestionar información sobre usuarios que pueden tener cómics asociados.

### 2. Comic:
   - Atributos: 
     * id
     * titulo
     * descripción
     * formato
     
   - Objetivo: Manejar información individual de cómics.

### 3. Colección de Comics:
   - Atributos:
     * id
     * nombre
     * comics (una lista de comics que pertenezcan a la colección
    
   - Objetivo: Administrar colecciones que contienen cómics específicos.

## Funcionalidades:
### - Usuarios:
  * Crear un nuevo usuario.
  * Obtener información de un usuario por su ID.
  * Obtener una lista de todos los usuarios.
  * Actualizar información de un usuario existente.
  * Eliminar un usuario.
### - Cómics:
  * Crear un nuevo cómic.
  * Obtener información de un cómic por su ID.
  * Obtener una lista de todos los cómics.
  * Actualizar información de un cómic existente.
  * Eliminar un cómic.
### - Colección de Comics:
  * Crear una nueva colección.
  * Obtener información de una colección por su ID.
  * Obtener una lista de todas las colecciones.
  * Actualizar información de una colección existente.
  * Eliminar una colección
