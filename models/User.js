const {Schema, model, Types } = require('mongoose');


const UserSchema = new Schema ({
    username: {
        type:String,
        unique:true,
        required:true,
        trim:true
    },
    email: {
        type:String,
        unique:true,
        required:true,
        match: [ /.+@.+\..+/, 'Please enter a valid email' ]
    },
    thoughts: [
        {
            type:Schema.Types.ObjectId,
            //connecting to the Thoughts model
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type:Schema.Types.ObjectId,
            //self connection
            ref: 'User'
        }
    ]
},
//tells out Schema it can expect virtuals
{
    toJSON:{
        virtuals: true,
    },

    id:false
});

// get friend count on retrieval
UserSchema.virtual('friendCount').get(function(){
    return this.friends.length;
})

const User = model('User', UserSchema);

//export the User Model
module.exports = User; 