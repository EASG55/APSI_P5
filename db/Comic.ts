import mongoose from "mongoose";
import Comic from "../types.ts"
import {ColeccionDeComicsModel} from "./ColeccionDeComics.ts"

const Schema = mongoose.Schema;

const ComicSchema = new Schema({
  titulo: {type: String, required: true},
  descripcion: {type: String, required: true},
  formato: {type: String, required: true},
});


export type ComicModelType = mongoose.Document & Omit<Comic, "_id">;

ComicSchema.post("findOneAndDelete", async function (doc: ComicModelType) {
  try{
    await ColeccionDeComicsModel.updateMany({comics: doc._id}, {$pull: {comics: doc._id}});

    await ComicModel.deleteMany({_id: {$in: doc.comics}});
  
  }catch(e){
    throw new Error(e);
  }

});

export const ComicModel = mongoose.model<ComicModelType>("Comic", ComicSchema);
