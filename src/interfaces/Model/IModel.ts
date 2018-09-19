import { Model as m, model, Schema } from 'mongoose';

export interface IModel {
    schema: Schema;
    model_name: string;
    _model: any;

    setSchema(): IModel;

    configModel(): IModel;
}

export abstract class Model implements IModel {
    public _model: m<any>;
    public model_name: string = 'users';
    public schema: Schema;

    protected constructor(model_name = 'users') {
        this.model_name = model_name;
        this.setSchema().configModel();
    }

    public abstract setSchema(): Model;

    public configModel(): Model {
        this._model = model(this.model_name, this.schema);
        return this;
    }

    public get model() {
        return this._model;
    }
    public set model(model: m<any>) {
        throw new Error('read only property');
    }

}
