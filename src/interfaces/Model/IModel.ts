import {Schema} from "mongoose";

export interface IModel {
    schema: Schema;
    model_name:String;
    _model: any;
    setSchema():IModel;
    configModel():IModel;
}
export abstract class Model implements IModel{
    _model: any;
     model_name: String ='user';
     schema: Schema;

    configModel(): Model {
        return this;
    }

    setSchema(): Model {
        return this;
    }

    protected constructor(){
        this.setSchema()
            .configModel();
    }
}