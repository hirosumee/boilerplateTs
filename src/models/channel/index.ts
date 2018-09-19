import {Model} from "../../interfaces/Model/IModel";
import {Schema} from "mongoose";

class ChannelModel extends Model {
    constructor() {
        super('channels');
    }

    setSchema(): ChannelModel {
        this.schema = new Schema({
            name: {type: String, unique: true, required: true},
            members: {type: [{type: Schema.Types.ObjectId, ref: 'users'}]},
            lastMessage: {type: Schema.Types.ObjectId, ref: 'messages'},
            createdBy: {type: Schema.Types.ObjectId, required: true, ref: 'users'}
        }, {timestamps: true});
        return this;
    }

}

const channelModel = new ChannelModel();
export {channelModel};