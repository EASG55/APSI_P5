import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import {ComicModel, ComicModelType} from "../db/Comic.ts";
import {UsuarioModel, UsuarioModelType} from "../db/Usuario.ts";
import {ColeccionDeComicsModel, ColeccionDeComicsModelType} from "../db/ColeccionDeComics.ts";

export const Query = {
    usuario: async (_: unknown, args: { id: string }): Promise<UsuarioModelType> => {
        const usuario = await UsuarioModel.findById(args.id);
        if (!usuario) {
            throw new GraphQLError("Usuario no encontrado");
        }
        await usuario.populate({path: 'coleccionDeComics', populate: {path: 'comics'}});
        return usuario;

        
    },

    usuarios: async (): Promise<UsuarioModelType[]> => {
        const usuarios = await UsuarioModel.find();
        const usuariosPopulados = await Promise.all(usuarios.map(async (usuario) => {
            await usuario.populate({path: 'coleccionDeComics', populate: {path: 'comics'}});
            return usuario;
        }
        ));
        return usuarios;
    },

    comic: async (_: unknown, args: { id: string }): Promise<ComicModelType> => {
        const comic = await ComicModel.findById(args.id);
        if (!comic) {
            throw new GraphQLError("Comic no encontrado");
        }
        return comic;
    },

    comics: async (): Promise<ComicModelType[]> => {
        const comics = await ComicModel.find();
        return comics;
    },

    coleccion: async (_: unknown, args: { id: string }): Promise<ColeccionDeComicsModelType> => {
        const coleccion = await ColeccionDeComicsModel.findById(args.id);
        if (!coleccion) {
            throw new GraphQLError("Coleccion no encontrada");
        }
        await coleccion.populate('comics');
        return coleccion;
    },

    coleccionesDeComics: async (): Promise<ColeccionDeComicsModelType[]> => {
        const colecciones = await ColeccionDeComicsModel.find();
        const coleccionesPopuladas = await Promise.all(colecciones.map(async (coleccion) => {
            await coleccion.populate('comics');
            return coleccion;
        }
        ));
        return colecciones;
    },

};