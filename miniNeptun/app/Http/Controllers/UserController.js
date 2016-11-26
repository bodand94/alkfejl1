'use strict'

const Validator = use('Validator')
const User = use('App/Model/User')
const Hash = use('Hash')

class UserController {



    *renderLogin(req, res) {
        yield res.sendView('login');
    }

    *renderRegistration(req, res) {
        yield res.sendView('register');
    }

    * register(req, res) {
        const userData = req.all()

        const rules = {
            'email': 'required|email',
            'name': 'required',
            'password': 'required|min:1',
            'password_again': 'required|same:password'
        }

        const validation = yield Validator.validateAll(userData, rules)

        if (validation.fails()) {
            yield req
                .withOut('password', 'password_again')
                .andWith({ errors: validation.messages() })
                .flash()

            res.redirect('/register')
            return
        }

        const user = new User
        user.username = userData.name
        user.email = userData.email
        user.password = yield Hash.make(userData.password)

        try {
            yield user.save()
        } catch (e) {
            yield req
                .with({ error: 'Rossz regisztrációs adatok!' })
                .flash()
                res.redirect('/register')
                return
        }
        try {
            yield req.auth.login(user)
        } catch (e) {
            yield req
                .with({ error: 'Rossz belépési adatok!' })
                .flash()
                res.redirect('/register')
                return
        }


        res.redirect('/')
    }

    * login(req, res) {
        const email = req.input('email')
        const password = req.input('password')

        try {
            yield req.auth.attempt(email, password)
            res.redirect('/')
        } catch (ex) {
            yield req
                .with({ error: 'Rossz belépési adatok!' })
                .flash()

            res.redirect('/login')
        }
    }

    * logout(req, res) {
        yield req.auth.logout()

        res.redirect('/')
    }

}

module.exports = UserController
