const {Schema, model, Types } = require('mongoose');

const ThoughtSchema = new Schema (
    {
        thoughtText: {
            type:String,
            required:true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type:Date,
            default: Date.now,
            //gets our dateFormat 
            get:(createdAtVal) => dateFormat(createdAtVal)

        }

    },
    {
        toJSON: {
            virtuals:true,
            getters:true
        },
        id:false
    })

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;