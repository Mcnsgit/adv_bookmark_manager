const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    settings: {
        theme: {
            type: String,
            enum: ['system', 'light', 'dark'],
            default: 'system'
        },
        default_view: {
            type: String,
            enum: ['list', 'grid'],
            default: 'list'
        }
    }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;