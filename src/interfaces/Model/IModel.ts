import {Model as m, model, Schema} from "mongoose";

export interface IModel {
    schema: Schema;
    model_name: String;
    _model: any;

    setSchema(): IModel;

    configModel(): IModel;
}

export abstract class Model implements IModel {
    _model: m<any>;
    model_name: string = 'user';
    schema: Schema;

    abstract setSchema(): Model;

    configModel(): Model {
        this._model = model(this.model_name, this.schema);
        return this;
    }

    public get model() {
        return this._model;
    }

    protected constructor(model_name = 'user') {
        this.model_name = model_name;
        this.setSchema()
            .configModel();
    }
}