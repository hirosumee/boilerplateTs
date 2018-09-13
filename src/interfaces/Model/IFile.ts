import { Schema } from 'mongoose';

export interface IFile {
    owner: Schema.Types.ObjectId;
    filename: String;
    originalname: String;
    encoding: String;
    mimetype: String;
    path: String;
    size: Number;
    requirepassword: Boolean;
    password?: String;
}
