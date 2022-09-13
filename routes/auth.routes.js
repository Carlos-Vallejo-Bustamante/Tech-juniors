const router = require('express').Router();
const UserModel = require('../models/User.model');
const { roleValidation } = require('../middleware/roles.middleware');
const { USER, COMPANY } = require('../const/user.const');
const isLogedin = require('../middleware/is_logedin.middleware');

//--------- GET -------
// Create new user
router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

// Login
router.get('/login', (req, res) => {
    res.render('auth/login');
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    res.redirect('/')
})

// Profile
router.get('/profile', isLogedin, (req, res) => {
    const user = req.session.user
    res.render('auth/profile', user);
});

// Edit Profile
router.get('/edit/:id', (req, res, next) => {
    UserModel.findById(req.params.id)
        .then((user) => {
            res.render('auth/profile-edit', user);
        })
        .catch((err) => {
            next(err);
        });
});




// ------------ POST --------
// Create new user 
router.post('/create', (req, res, next) => {
    const { username, email, password, role } = req.body
    UserModel.create({ username, email, password, role })
        .then((user) => {
            req.session.user = user;
            res.redirect('/auth/profile');
        })
        .catch((err) => {
            next(err);
        });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email }).then((user) => {
        if (user) {
            if (user.comparePassword(password)) {
                req.session.user = user;
                res.redirect('/auth/profile');
            } else {
                res.render('auth/login', { errorMessage: 'email or password incorrect' });
            }
        } else {
            res.render('auth/login', { errorMessage: 'email or password incorrect' });
        }
    });
});

// Edit Profile
router.post('/edit/:id', (req, res, next) => {
    const { username, email } = req.body
    UserModel.findByIdAndUpdate(req.params.id, { username, email }, { new: true })
        .then((user) => {
            req.session.user = user
            res.redirect('/auth/profile');
        })
        .catch((err) => {
            next(err);
        });
});

// Delete
router.post('/:id/delete', (req, res, next) => {
    UserModel.findByIdAndDelete(req.params.id)
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            next(err);
        });

});


module.exports = router;