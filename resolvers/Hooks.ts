import {GraphQLError} from "graphql";


import {UsuarioModel, UsuarioModelType} from "../db/Usuario.ts";
import {ComicModel, ComicModelType} from "../db/Comic.ts";
import {ColeccionDeComicsModel, ColeccionDeComicsModelType} from "../db/ColeccionDeComics.ts";

export const Usuario = {
    coleccionesDeComics: async (parent: UsuarioModelType): Promise<ColeccionDeComicsModelType[]> => {
        const colecciones = await ColeccionDeComicsModel.find({_id: {$in: parent.coleccionesDeComics}});
        if(!colecciones) throw new GraphQLError("Colecciones no encontradas")
        return colecciones;
    }
};

export const ColeccionDeComics = {
    comicsID: async (parent: ColeccionDeComicsModelType): Promise<ComicModelType[]> => {
        const comics = await ComicModel.find({_id: {$in: parent.comicsID}});
        if(!comics) throw new GraphQLError("Comics no encontrados")
        return comics;
    }
};


