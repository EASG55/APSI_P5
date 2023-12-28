export const typeDefs = `#graphql
  type Usuario {
    id: ID!
    nombre: String!
    correoElectronico: String!
    coleccionDeComics: [ColeccionDeComics]!
  }

  type Comic {
    id: ID!
    titulo: String!
    descripcion: String!
    formato: String!
  }

  type ColeccionDeComics {
    id: ID!
    nombre: String!
    comics: [Comic]!
  }

  type Query {
    usuario(id: ID!): Usuario!
    usuarios: [Usuario]!
    comic(id: ID!): Comic!
    comics: [Comic]!
    coleccion(id: ID!): ColeccionDeComics
    coleccionesDeComics: [ColeccionDeComics]!
  }

  type Mutation {
    crearUsuario(nombre: String!, correoElectronico: String!, coleccionDeComics:[ID]!): Usuario!
    actualizarUsuario(id: ID!, nombre: String, correoElectronico: String!, coleccionDeComics: [ID]!): Usuario!
    eliminarUsuario(id: ID!): Usuario!

    crearComic(titulo: String!, descripcion: String!, formato: String!): Comic!
    actualizarComic(id: ID!, titulo: String!, descripcion: String!, formato: String!): Comic!
    eliminarComic(id: ID!): Comic!

    crearColeccionDeComics(nombre: String!, comics: [ID]!): ColeccionDeComics!
    actualizarColeccionDeComics(id: ID!, nombre: String!, comics: [ID]!): ColeccionDeComics!
    eliminarColeccionDeComics(id: ID!): ColeccionDeComics!
  }
`;