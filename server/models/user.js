import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },


    xp: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
export default User;