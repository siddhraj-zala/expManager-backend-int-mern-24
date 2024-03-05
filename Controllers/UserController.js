const userSchema = require("../Models/UserModel");
const encrypt = require('../Util/Encrypt');
const mailer = require('../Util/MailUtil');

const createUser = async (req, res) => {

    try {
        const data = req.body;
        const user = Object.assign(data, { password: encrypt.encryptPassword(data.password) });

        const createdUser = await userSchema.create(user);
        //console.log(createdUser);
        
        const to = createdUser.email;
        const sub = 'registration conformation';
        const html = `
                        <html>
                            <head>
                                <style>
                                    body {
                                        font-family: Arial, sans-serif;
                                    }
                                    .container {
                                        max-width: 600px;
                                        margin: 0 auto;
                                        padding: 20px;
                                        background-color: #f9f9f9;
                                    }
                                </style>
                            </head>
                            <body>
                                <div class="container">
                                    <h3 style="color:aqua">Welcome, ${createdUser.firstName}!</h3>
                                    <p style="color:green">You are successfully registered at Expense manager.</p>
                                </div>
                            </body>
                        </html>
                    `;
        const mailRes = mailer.mailSend(to, sub, html);
        
        res.status(201).json({
            message: "user created successfully",
            data: createdUser,
            flag: 1
        })
        
    } catch (err) {
        res.status(500).json({
            message: "error creating user",
            error: err,
            flag: -1
        })
    }
}

const getUser = async (req, res) => {

    try {
        const userData = await userSchema.find();

        res.status(200).json({
            message: "getUser...",
            data: userData,
            flag: 1
        })
    } catch (err) {
        res.status(404).json({
            message: "error getting user",
            error: err,
            flag: -1
        })
    }
}

const getUserById = async (req, res) => {

    try {
        const user = await userSchema.findById(req.params.id);

        res.status(200).json({
            message: "user found",
            data: user,
            flag: 1
        })
    } catch (err) {
        res.status(404).json({
            message: "user not found",
            error: err,
            flag: -1
        })
    }
}

const updateUserById = async (req, res) => {

    try {
        const id = req.params.id;
        const newData = req.body;

        const updatedUser = await userSchema.findByIdAndUpdate(id, newData);

        res.status(201).json({
            message: "user updated successfully",
            data: updatedUser,
            flag: 1
        })
    } catch (err) {
        res.status(404).json({
            message: "error updating user",
            error: err,
            flag: -1
        })
    }
}

const deleteUserById = async (req, res) => {

    try {
        const deletedUser = await userSchema.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "user deleted successfully",
            data: deletedUser,
            flag: 1
        })
    } catch (err) {
        res.status(404).json({
            message: "error deleting user",
            error: err,
            flag: -1
        })
    }
}

const userLogin = async (req, res) => {
    try {
        const email = req.body.email;
        const pass = req.body.password;

        const userByEmail = await userSchema.findOne({ email: email });
        if (userByEmail !== null) {

            const flag = encrypt.comparePassword(pass, userByEmail.password);

            if (flag === true) {
                res.status(200).json({
                    message: 'user login successfully',
                    data: userByEmail,
                    flag: 1
                })
            } else {
                res.status(404).json({
                    message: 'invalid password',
                    flag: -1
                })
            }
        } else {
            res.status(404).json({
                message: 'user not found',
                flag: -1
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'error login user',
            error: err,
            flag: -1
        })
    }

}
module.exports = {
    createUser,
    getUser,
    getUserById,
    updateUserById,
    deleteUserById,
    userLogin
}