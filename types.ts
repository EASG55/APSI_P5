import { ApolloServer, gql } from "@apollo/server";

// Tipo de datos Usuario
type User = {
  _id: string;
  nombre: string;
  correoElectronico: string;
  coleccionDeComics: ColeccionDeComics[];
};

// Tipo de datos Comic
type Comic = {
  _id: string;
  titulo: string;
  descripcion: string;
  formato: string;
};

// Tipo de datos ColeccionDeComics
type ColeccionDeComics = {
  _id: string;
  nombre: string;
  comics: Comic[];
};


