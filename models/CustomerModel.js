// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const bcrypt = require('bcryptjs');

// SALT_WORK_FACTOR = 10;

// const customerSchema = new Schema({
//     firstName: {
//         type: String,
//         required: true
//     },

//     lastName: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true
//     },
//     password: { //bcrypt
//         type: String,
//         required: true
//     },

//     phoneNumber: {
//         type: Array,
//         required: true
//     },

//     dateCreated: {
//         type: Date,
//         default: Date.now()
//     }
// });

// //hashing password before saving into db

// // bcrypt.genSalt(10, (err, salt)=> {
// //     bcrypt.hash("B4c0/\/", salt, (err, hash)=> {
// //       if(err) console.log('cant hash pass')
// //       else
// //     });
// // });




// customerSchema.pre("save", function (next) {
//     var user = this;

//     // only hash the password if it has been modified (or is new)
//     if (!user.isModified('password')) return next();

//     // generate a salt
//     bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
//         if (err) return next(err);

//         // hash the password using our new salt
//         bcrypt.hash(user.password, salt, (err, hash) => {
//             if (err) return next(err);

//             // override the cleartext password with the hashed one
//             user.password = hash;
//             next();
//         });
//     });


// });

// customerSchema.methods.comparePassword = function (candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };


// const CustomerModel = mongoose.model('Customer', customerSchema);

// module.exports = CustomerModel;

