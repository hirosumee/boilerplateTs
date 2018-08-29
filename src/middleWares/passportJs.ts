import {Strategy} from 'passport-local';
import {serializeUser,deserializeUser,use} from 'passport';
import * as bcrypt from 'bcrypt';

import {userModel} from '../models/user';

use(new Strategy(async function (username,password,done) {
    try {
        let user = await userModel.model.findOne({username});
        if(!user){
            return done(null, false, { message: 'Incorrect username and password' })
        }
        let result = await bcrypt.compare(password,user.password);
        if(result){
           return done(null,user);
        } else {
            return done(null, false, { message: 'Incorrect username and password' })
        }
    }catch (e) {
        return done(e);
    }
}));
// config what will be saved in req.session.passport
serializeUser(function (user:{id:any},done) {
    done(null,user.id);
});
//retrieve user data after login for req.user
deserializeUser(async function (id,done) {
    try {
        let user = await  userModel.model.findById(id);
        done(null,user);
    } catch (e) {
        done(e);
    }
});

export default function () {
    console.log('passport loaded');
};