import mongoose from "mongoose";
import {ColeccionDeComics} from "../types.ts"
import {ComicModel} from "./Comic.ts"
import {UsuarioModel} from "./Usuario.ts"


const Schema = mongoose.Schema;

const ColeccionDeComicsSchema = new Schema({
  nombre: {type: String, required: true},
  comics: [{type: Schema.Types.ObjectId, ref: "Comic"}],
});

export type ColeccionDeComicsModelType = mongoose.Document & Omit<ColeccionDeComics, "_id">;

ColeccionDeComicsSchema.path("comics").validate(async function (comics: mongoose.Types.ObjectId[]) {
  try {
    if(!comics.every((comic) => mongoose.isValidObjectId(comic))) return false;
    
    const comicsEncontrados = await ComicModel.find({_id: {$in: comics}});
    if (comicsEncontrados.length !== comics.length) return false;
    
    return true;
  } catch (e) {
    return false;
  }
});

ColeccionDeComicsSchema.post("findOneAndDelete", async function (doc: ColeccionDeComicsModelType) {
  try {
    await UsuarioModel.updateMany({coleccionDeComics: doc._id}, {$pull: {coleccionDeComics: doc._id}});

    await ComicModel.deleteMany({_id: {$in: doc.comics}});
    } catch (e) {
    throw new Error(e);
  }
}
);


export const ColeccionDeComicsModel = mongoose.model<ColeccionDeComicsModelType>("ColeccionDeComics", ColeccionDeComicsSchema);
