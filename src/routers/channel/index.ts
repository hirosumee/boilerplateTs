import {iRouter} from "../../interfaces/Router/IMy_Router";
import {loginRequired} from "../../middleWares/requestMiddleware";
import {NextFunction, Request, Response} from "express";
import {channelModel} from "../../models/channel";
import {messageModel} from "../../models/message";

class ChannelRouter extends iRouter {
    constructor() {
        super();
    }

    registerRouter(): ChannelRouter {
        this.getRoute()
            .get('/', loginRequired, async (req: Request, res: Response, next: NextFunction) => {
                let channels = await channelModel.model.find({members: req.user._id})
                    .populate('members')
                    .populate('lastMessages')
                    .sort({modifiedDate: 1});
                res.send(channels.map(item => {
                    return {
                        name: item.name,
                        members: item.members.map(i => i.username),
                        lastMessages: item.lastMessages,
                        modifiedDate: item.modifiedDate
                    }
                }))
            })
            .get('/:name',loginRequired, async (req: Request, res: Response, next: NextFunction) => {
                let channelName = req.params.name;
                let channel = await channelModel.model.findOne({name:channelName});
                let messages = await messageModel.model.find({channel:channel._id}).populate('createdBy');
                res.send(messages.map(message=>{
                    return {
                        content:message.content,
                        channel:channelName,
                        type:message.type,
                        createdAt:message.createdAt,
                        createdBy:message.createdBy.username
                    }
                }));
            });
        return this;
    }
}

export default new ChannelRouter();
