import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup =async(req, res) => {
   try {
      const { firstName, lastName, email, password } = req.body;

      const existingEmail = await User.findOne({ email });
		if (existingEmail) {
			return res.status(400).json({ message: "Email already taken" });
		}
      
      const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			firstame,
            lastName,
			email,
			password: hashedPassword,
		});
		await user.save();

		const token = jwt.sign({id: user_.id}, process.env.JWT_SECRET, {expiresIn: '2d'});
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 2 * 24 * 60 * 60 * 1000
		})

		res.status(201).json({message: "Registered successfuly"});


   } catch (error) {
	console.log("Error in signup: ", error.message);
	res.status(500).json({message: "internal server error"}); 
   }
}