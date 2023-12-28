import { GraphQLError } from "graphql";
import mongoose from "mongoose";
import {ComicModel, ComicModelType} from "../db/Comic.ts";
import {UsuarioModel, UsuarioModelType} from "../db/Usuario.ts";
import {ColeccionDeComicsModel, ColeccionDeComicsModelType} from "../db/ColeccionDeComics.ts";

export const Mutation = {
    crearUsuario: async (_: unknown, args: {nombre: string, correoElectronico: string, coleccionDeComics: string}):Promise<UsuarioModelType> => {
        const usuario = {
            nombre: args.nombre,
            correoElectronico: args.correoElectronico,
            coleccionDeComics: args.coleccionDeComics,
        };
        const usuarioCreado = await new UsuarioModel(usuario).save();
        await usuarioCreado.populate({path: 'coleccionDeComics', populate: {path: 'comics'}});
        return usuarioCreado;
        },
      
    

    crearComic: async (_: unknown, args: {titulo: string, descripcion: string, formato: string}):Promise<ComicModelType> => {
        const comic = {
            titulo: args.titulo,
            descripcion: args.descripcion,
            formato: args.formato,
        };
        const comicCreado = await new ComicModel(comic).save();
        return comicCreado;
    },

    crearColeccionDeComics: async (_: unknown, args: {nombre: string, comics: string[]}):Promise<ColeccionDeComicsModelType>=> {
        const coleccion = {
            nombre: args.nombre,
            comics: args.comics,
        };
        const coleccionDeComics = await new ColeccionDeComicsModel(coleccion).save();
        await coleccionDeComics.populate('comics');
        return coleccionDeComics;
      },

      actualizarUsuario: async (_: unknown, args: {id: string, nombre: string, correoElectronico: string, coleccionDeComics: string[]}):Promise<UsuarioModelType> => {
        const {id, nombre, correoElectronico, coleccionDeComics} = args;
        const usuario = await UsuarioModel.findByIdAndUpdate(id, {nombre, correoElectronico, coleccionDeComics}, {new: true, runValidators: true});
        if (!usuario) {
            throw new GraphQLError("Usuario no encontrado");
        }
        await usuario.populate({path: 'coleccionDeComics', populate: {path: 'comics'}});
        return usuario;
    },

    actualizarComic: async (_: unknown, args: {id: string, titulo: string, descripcion: string, formato: string}):Promise<ComicModelType> => {
        const {id, titulo, descripcion, formato} = args;
        const comic = await ComicModel.findByIdAndUpdate(id, {titulo, descripcion, formato}, {new: true, runValidators: true});
        if (!comic) {
            throw new GraphQLError("Comic no encontrado");
        }
        return comic;
    },

    actualizarColeccionDeComics: async (_: unknown, args: {id: string, nombre: string, comics: string[]}):Promise<ColeccionDeComicsModelType> => {
        const {id, nombre, comics} = args;
        const coleccionDeComics = await ColeccionDeComicsModel.findByIdAndUpdate(id, {nombre, comics}, {new: true, runValidators: true});
        if (!coleccionDeComics) {
            throw new GraphQLError("Coleccion no encontrada");
        }
        await coleccionDeComics.populate('comics');
        return coleccionDeComics;
    },

    eliminarUsuario: async (_: unknown, args: {id: string}):Promise<UsuarioModelType> => {
        const usuario = await UsuarioModel.findByIdAndDelete(args.id);
        if (!usuario) {
            throw new GraphQLError("Usuario no encontrado");
        }
        await usuario.populate({path: 'coleccionDeComics', populate: {path: 'comics'}});
        return usuario;
    },

    eliminarComic: async (_: unknown, args: {id: string}):Promise<ComicModelType> => {
        const {id} = args;
        const comic = await ComicModel.findByIdAndDelete({_id: id});
        if (!comic) {
            throw new GraphQLError("Comic no encontrado");
        }
        return comic;
    },

    eliminarColeccionDeComics: async (_: unknown, args: {id: string}):Promise<ColeccionDeComicsModelType> => {
        const {id} = args;
        const coleccionDeComics = await ColeccionDeComicsModel.findByIdAndDelete({_id: id});
        if (!coleccionDeComics) {
            throw new GraphQLError("Coleccion no encontrada");
        }
        await coleccionDeComics.populate('comics');
        return coleccionDeComics;
    },


    
};