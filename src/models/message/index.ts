import {Model} from "../../interfaces/Model/IModel";
import {Schema} from "mongoose";

class MessageModel extends Model {
    constructor(){
        super('messages');
    }
    setSchema(): MessageModel {
        this.schema = new Schema({
            content:{type:String,unique:true},
            type:{type:String,enum:['text','image']},
            channel:{type:Schema.Types.ObjectId,required: true,ref:'channels'},
            createdBy:{type:Schema.Types.ObjectId,required: true,ref:'users'}
        },{timestamps:true});
        return this;
    }

}
const messageModel = new MessageModel();
export {messageModel};