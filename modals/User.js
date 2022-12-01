const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const { isEmail } = require('validator')

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, 'please enter password'],
        minlength: [3, 'Minimum username length is 3'],
        max: 20,
        unique: true,
    },
    email: {
        type: String,
        required: [true, 'Please enter email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        required: [true, 'please enter password'],
        minlength: [6, 'Minimum password length is 6']
    },
    profilePic: {
        type: String,
        default: ""
    },
    coverPic: {
        type: String,
        default: ""
    },
    followers: {
        type: Array,
        default: []
    },
    followings: {
        type: Array,
        default: []
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    desc: {
        type: String,
        max: 200,
        default: ""
    },
    city: {
        type: String,
        max: 50
    },
    from: {
        type: String,
        max: 50
    },
    relationships: {
        type: Number,
        enum: [1, 2, 3]
    },
}, {
    timestamps: true
}

)

userSchema.pre('save', async function (next) {
    const hashPassword = await bcrypt.hash(this.password, 10)
    this.password = hashPassword
    console.log(this)
    next()
})


userSchema.statics.login = async function (email,password) {
    const user = await this.model('User').findOne({ email:email })
    if (user) {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return user;
        }
        throw Error('incorrect password');
    }
    throw Error("incorrect email")


}


module.exports = mongoose.model("User", userSchema)