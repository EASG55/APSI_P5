import { ApolloServer, gql } from "@apollo/server";

type User = {
  _id: string;
  nombre: string;
  correoElectronico: string;
  coleccionDeComics: ColeccionDeComics[];
};

type Comic = {
  _id: string;
  titulo: string;
  descripcion: string;
  formato: string;
};

type ColeccionDeComics = {
  _id: string;
  nombre: string;
  comics: Comic[];
};


