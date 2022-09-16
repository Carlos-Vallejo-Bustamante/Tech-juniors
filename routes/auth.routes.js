const router = require('express').Router();
const multerMiddleware = require('../middleware/multer.middleware');
const UserModel = require('../models/User.model');
const isLogedin = require('../middleware/is_logedin.middleware');
const { roleValidation } = require('../middleware/roles.middleware');
const { COMPANY } = require('../const/user.const')
const { findById } = require('../models/User.model');

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

router.get('/list-user', roleValidation(COMPANY), (req, res, next) => {
    UserModel
        .find()
        .then((listUsers) => {
            res.render('auth/list-users', { listUsers })
        })
        .catch((err) => {
            next(err);
        });
})

router.get('/list-user/:jobId', roleValidation(COMPANY), (req, res, next) => {
    const { jobId } = req.params
    UserModel
        .findById(jobId)
        .then((user) => {
            res.render('auth/user', user)
        })
        .catch((err) => {
            next(err);
        });
})


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

router.post('/edit/:id', multerMiddleware.single('avatar'), (req, res, next) => {
    const { username, email, name, lastname, genre, borndate, linkedin, github, avatar } = req.body
    let image = undefined;
    if (req.file && req.file.path) {
        image = req.file.path
    }
    UserModel.findByIdAndUpdate(req.params.id, { username, email, name, lastname, genre, borndate, linkedin, github, avatar: image }, { new: true })
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
            req.session.destroy();
            res.redirect('/');
        })
        .catch((err) => {
            next(err);
        });

});

module.exports = router;