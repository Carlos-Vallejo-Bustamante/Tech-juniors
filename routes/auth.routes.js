const router = require('express').Router();
const UserModel = require('../models/User.model');
const isLogedin = require('../middleware/is_logedin.middleware');

//--------- GET -------
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

router.get('/profile', isLogedin, (req, res) => {
    const user = req.session.user
    UserModel
        .findById(user._id)
        .populate('favorites')
        .then((favoritesjobs) => {
            res.render('auth/profile', { user, favoritesjobs });
        })
        .catch((err) => {
            next(err);
        });
});

router.get('/edit/:id', (req, res, next) => {
    const { id } = req.params

    UserModel.findById(id)
        .then((user) => {
            res.render('auth/profile-edit', user);
        })
        .catch((err) => {
            next(err);
        });
});

// ------------ POST --------
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

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    UserModel.findOne({ email }).then((user) => {
        if (user) {
            if (user.comparePassword(password)) {
                req.session.user = user;
                res.redirect('/auth/profile');
            } else {
                res.render('auth/login', { errorMessage: 'email or password incorrect ❗️' });
            }
        } else {
            res.render('auth/login', { errorMessage: 'email or password incorrect ❗️' });
        }
    });
});

// Remove favorite
router.post('/profile/:jobId', isLogedin, (req, res, next) => {
    const user = req.session.user
    const jobFavorite = req.params.jobId
    UserModel
        .findByIdAndUpdate(user, { $pull: { favorites: jobFavorite } }, { new: true })
        .then(() => {
            res.redirect('/auth/profile');
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/edit/:id', (req, res, next) => {
    const { username, email, name, lastname, genre, borndate, linkedin, github } = req.body
    UserModel.findByIdAndUpdate(req.params.id, { username, email, name, lastname, genre, borndate, linkedin, github }, { new: true })
        .then((user) => {
            req.session.user = user
            res.redirect('/auth/profile');
        })
        .catch((err) => {
            next(err);
        });
});

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