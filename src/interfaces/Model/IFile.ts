import { Schema } from 'mongoose';

export interface IFile {
    owner: Schema.Types.ObjectId;
    filename: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    path: string;
    size: number;
    requirepassword: boolean;
    password?: string;
}
