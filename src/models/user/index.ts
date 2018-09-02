import {Schema, model} from 'mongoose';
import {Model} from "../../interfaces/Model/IModel";

class UserModel extends Model{
    setSchema(): UserModel {
        this.schema = new Schema({
            username: {type: String, unique: true},
            password: {type: String}
        }, {timestamps: true});
        return this;
    }


    constructor() {
       super();
    }
}
let userModel = new UserModel();

export {userModel}