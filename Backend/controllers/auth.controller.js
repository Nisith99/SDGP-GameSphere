import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup =async(req, res) => {
   try {
      const { fullName, userName, email, password } = req.body;

      const existEmail = await User.findOne({ email });
		if (existEmail) {
			return res.status(400).json({ message: "Email already taken" });
		}
      
      const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const user = new User({
			fullName,
            userName,
			email,
			password: hashedPassword,
			role: null,
		});
		await user.save();

		const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '2d'});
		res.cookie('jwt-gamesphere', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 2 * 24 * 60 * 60 * 1000
		})

		res.status(201).json({message: "Registered successfuly", userId: user._id});


   } catch (error) {
	console.log("Error in signup: ", error.message);
	res.status(500).json({message: "Server error"}); 
   }
};

export const login = async (req, res) => {
	try {
		const { userName, password } = req.body;

		
		const user = await User.findOne({ userName });
		if (!user) {
			return res.status(400).json({ message: "Invalid username" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid password" });
		}
		
		const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '2d'});
		res.cookie('jwt-gamesphere', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 2 * 24 * 60 * 60 * 1000
		})

		res.json({ message: "Logged in successfully", token });
	} catch (error) {
		console.error("Error in login:", error);
		res.status(500).json({ message: "Server error" });
	}
};