import userModel from "../models/userModel.js"

export const registerController = async (req, res) => {
    try {
        const { firstName, email, password } = req.body;

        // validate
        if (!firstName) {
            return res.status(400).send({
                success: false,
                message: "please provide firstName",
            })
        }
        if (!email) {
            return res.status(400).send({
                success: false,
                message: "please provide email",
            })
        }
        if (!password) {
            return res.status(400).send({
                success: false,
                message: "please provide password",
            })
        }

        // existing user
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Email Already Register Please Login'
            });
        }

        // create user
        const user = await userModel.create({ firstName, email, password });

        //token
        const token = user.createJWT();

        res.status(201).send({
            success: true,
            message: "User Created Successfully",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                location: user.location
            },
            token,
        })

        

    } catch (error) {
        console.log(error);
        res.status(400).send({
            message: "Error In Register Controller",
            success: false,
            error,
        });
    }
}