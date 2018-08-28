import {Schema, model} from 'mongoose';
import {Model} from "../../interfaces/Model/IModel";

class UserModel extends Model{
    model_name = 'user';
    setSchema(): UserModel {
        this.schema = new Schema({
            username: {type: String, unique: true},
            password: {type: String}
        }, {timestamps: true});
        return this;
    }

     configModel(): UserModel {
        this._model = model(this.model_name, this.schema);
        return this;
    }

    public get model(){
        return this._model;
    }

    constructor() {
       super();
    }
}
let userModel = new UserModel();

export {userModel}