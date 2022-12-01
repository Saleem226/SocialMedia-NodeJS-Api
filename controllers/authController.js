const User = require('../modals/User')

class AuthController {
    static handleErrors = (err) => {
        console.log(err.message, err.code)
        const error = { username: "", email: "", password: "" }

        if (err.message == "incorrect password") {
            error.password = "Incorect user password"
        }
        if (err.message == "incorrect email") {
            error.email = "Incorect user email"
        }

        if (err.code === 11000) {
            for (let key in err.keyPattern) {
                error[key] = "Duplicate not allowed"
            }
        }

        if (err.message.includes("User validation failed")) {
            Object.values(err.errors).forEach(({ properties }) => {
                // console.log(properties.path,properties.message)
                error[properties.path] = properties.message
            })
        }

        return error
    }

    static register = async (req, res) => {
        try {
            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
            })

            const user = await newUser.save()
            res.status(201).json({
                "message": "Account created",
                'user': user
            })
        } catch (error) {
            const errorafterhandling = this.handleErrors(error)

            res.send(errorafterhandling)
        }

    }


    static login = async (req, res) => {
        try {
            const user = await User.login(req.body.email, req.body.password)
            res.status(200).send(user)
            res.locals.user="usama"
            console.log(res.locals)

        } catch (error) {
            const errorafterhandling = this.handleErrors(error)

            res.status(400).send(errorafterhandling)
        }

    }









}


module.exports = AuthController