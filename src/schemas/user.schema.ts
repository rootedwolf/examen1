import { model, Schema } from 'mongoose'
import { iUserSchema } from '../models/interfaces/user.interface';
const UserSchema = new Schema({
    username: { type: String, required: true },
    fullName: { type: String, required: true },
    createdAt: { type: Date, required: false },
    updatedAt: { type: Date, required: false }
});
UserSchema.pre('save', function (next) {
    const now = new Date()
    this.updatedAt = now
    if (!this.createdAt) {
        this.createdAt = now
    }
    next()
});

export default model<iUserSchema>("User", UserSchema);