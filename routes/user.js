const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const ObjectId = require('mongodb').ObjectId;
const fs = require('fs')

const User = require('../models/User');
// separate routes for HTML, 
// prefix with auth: user authentication (register/login)
//
router.post('/register', function (req, res) {
    const { errors, isValid } = validateRegisterInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if (user) { // deal with a duplicate user
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else { // create a generic avatar
            const avatar = gravatar.url(req.body.email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({ // create the user using the avatar
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });

            bcrypt.genSalt(10, (err, salt) => {
                if (err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                });
                        }
                    });
                }
            });
        }
    });
});

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }
                        jwt.sign(payload, 'secret', {
                            expiresIn: 3600
                        }, (err, token) => {
                            if (err) console.error('There is some error in token', err);
                            else {
                                res.json({
                                    success: true,
                                    token: `Bearer ${token}`
                                });
                            }
                        });
                    }
                    else {
                        errors.password = 'Incorrect Password';
                        return res.status(400).json(errors);
                    }
                });
        });
});

router.post('/AddFriend', function (req, res) { // 'req' is the package of two friends 
    User.findOneAndUpdate(
        { // find user to be friended, by email address
            email: req.body.requestee
        }, {
            $push: {
                FriendRequestedBy: req.body.requestor.id
            }
        } // TODO now this an object
    )
        // .populate('FriendRequestedBy')
        // .then(FriendRequests => res.json(FriendRequests))
        .then(user => {
            if (user) { // user exists, submit request to DB
                return res.end()
            }
            else { // user not found, inform requestor
                return res.status(404).json({
                    reply: 'Email not found'
                });
            } // end else
        }) // end then
        .catch(err => res.status(422).json(err))
}) //end router.post

router.post('/DeleteRequest', function (req, res) {
    User.findOneAndUpdate(
        {
            _id: ObjectId(req.body.requestor)
        }, {
            $pull: {
                FriendRequestedBy: req.body.acceptor
            }
        }
    )
        .catch(err => res.status(404).json(err));
    User.findOneAndUpdate(
        {
            _id: ObjectId(req.body.acceptor)
        }, {
            $pull: {
                FriendRequestedBy: req.body.requestor
            }
        }
    )
        .populate('FriendRequestedBy')
        .then(FriendRequests => res.json(FriendRequests))
        .catch(err => res.status(422).json(err))
})

router.post('/DeleteFriendRequest', function (req, res) {
    User.findOneAndUpdate(
        {
            _id: ObjectId(req.body.rejector)
        }, {
            $pull: {
                FriendRequestedBy: req.body.requestor
            }
        }
    )
        .populate('FriendRequestedBy')
        .then(FriendRequests => res.json(FriendRequests))
        .catch(err => res.status(422).json(err))
})

router.post('/FriendRequests', function (req, res) { // ONLY shows active friend requests for the logged-in users
    const id = req.body.id
    User.findById(id)
        .populate('FriendRequestedBy')
        .then(FriendRequests => res.json(FriendRequests))
        .catch(err => res.status(404).json(err));
})

router.post('/BlogPosts', function (req, res) {
    const id = req.body.id;
    const post = req.body.post;
    User.findOneAndUpdate(
        { _id: ObjectId(id) }, { $push: { BlogPosts: post } })
        .catch(err => res.status(404).json(err))
        .then(Friends => res.json(Friends))
        .catch(err => res.status(422).json(err))
})

router.post('/AcceptFriend', function (req, res) {
    console.log(req.body)
    const requestorId = req.body.requestor;
    const acceptorId = req.body.acceptor;
    User.findOneAndUpdate(
        { _id: ObjectId(requestorId) }, { $push: { Friends: acceptorId } })
        .catch(err => res.status(404).json(err));
    User.findOneAndUpdate(
        { _id: ObjectId(acceptorId) }, { $push: { Friends: requestorId } })
        .populate('Friends')
        .then(Friends => res.json(Friends))
        // .then(user => {
        //     if (user) { // user exists, submit request to DB
        //         return res.end()
        //     }
        //     else { // user not found, inform requestor
        //         return res.status(404).json({
        //             reply: 'Email not found'
        //         });
        //     } // end else
        // }) // end then
        .catch(err => res.status(422).json(err))
})

router.post('/Friends', function (req, res) {
    const id = req.body.id
    User.findById(id)
        .populate('Friends')
        .then(Friends => res.json(Friends))
        .catch(err => res.status(404).json(err));
})

router.post('/ProfileFriends', function (req, res) {
    const id = req.body.id
    User.findById(id)
        .populate('Friends')
        .then(Friends => res.json(Friends))
        .catch(err => res.status(404).json(err));
})

router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    // console.log("itches." + req.user.id);
    return res.json(
        {
            id: req.user.id,
            name: req.user.name,
            email: req.user.email,
            FriendRequestedBy: req.user.FriendRequestedBy,
            Friends: req.user.Friends
        }
    );
});

router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
});

router.post("/images", (req,res) => {
    // console.log(req.body.image)
    const image = req.body.image.split(',')[1]
    const type = req.body.type.split('/')[1]
    fs.writeFile('./frontend/public/images/'+req.body.id+'.'+type, image, "base64" ,(err) => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
    User
    .findOneAndUpdate({ _id: req.body.id }, 
      {
        $set : {
            path : "/images/"+req.body.id+"."+type
            // name: "brett"
           }
      }
    )
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
  
  })
  
router.get("/upload/:id", (req, res) => {
    User
    // .find({name: "tiger woods"})
      // .find({"_id": ObjectId(req.params.id)})
      // .find(ObjectId(req.params.id))
      // .findById(req.params.id)
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  })

module.exports = router;