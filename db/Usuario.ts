import mongoose from "mongoose";
import {Usuario} from "../types.ts";
import {ColeccionDeComicsModel} from "./ColeccionDeComics.ts";
import {ComicModel} from "./Comic.ts";

const Schema = mongoose.Schema;

const UsuarioSchema = new Schema({
  nombre: {type: String, required: true},
  correoElectronico: {type: String, required: true},
  coleccionDeComics: [{type: Schema.Types.ObjectId, required: true, ref: "ColeccionDeComics"}],
});

UsuarioSchema.path("coleccionDeComics").validate(async function (coleccion: mongoose.Types.ObjectId[]) {
  try{
    // Check if all coleccionDeComics are valid ObjectIds
    if(!coleccion.every((coleccion) => mongoose.isValidObjectId(coleccion))) return false;
    
    // Check if all coleccionDeComics exist in the database
    const coleccionEncontrada = await ColeccionDeComicsModel.find({_id: {$in: coleccion}});
    if (coleccionEncontrada.length !== coleccion.length) return false;
    
    return true;
  }
  catch(e){
    return false;
  }
});

UsuarioSchema.post("findOneAndDelete", async function (doc: UsuarioModelType) {
  try{
    await ColeccionDeComicsModel.deleteMany({_id: {$in: doc.coleccionDeComics}});

  }catch(e){
    throw new Error(e);
  }
}
);


export type UsuarioModelType = mongoose.Document & Omit<Usuario, "_id">;

export const UsuarioModel = mongoose.model<UsuarioModelType>("Usuario", UsuarioSchema);
