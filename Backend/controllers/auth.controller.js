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
			firstName,
            lastName,
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
		const { email, password } = req.body;

		
		const user = await User.findOne({ email });
		if (!email) {
			return res.status(400).json({ message: "Invalid email" });
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

		res.json({ message: "Logged in successfully" });
	} catch (error) {
		console.error("Error in login:", error);
		res.status(500).json({ message: "Server error" });
	}
};

export const selectRole = async (req, res) => {
	try{
		const {userId, role, profileData} = req.body;
		if(!userId || !role){
			return res.status(400).json({message: "user ID and role are needed"})
		}

		if(role !== "player" && role !== "club"){
			return res.status(400).json({message: "Invalid role selecting"})
		}

		const user = await User.findById(userId);
		if(!user){
			return res.status(404).json({message: "User not found"})
		}

		user.role = role;
		if(role == "player"){
			user.playerProfile = profileData;
		}else if (role == "club"){
			user.clubProfile = profileData;
		}

		await user.save();

		res.status(200).json({message: "User role updated successfully", role: user.role});

	}catch(error){
		console.error("Error in role section: ", error);
		res.status(500).json({message: "Server error"});
	}
};

export const getProfile = async (req,res) => {
	try{
		const userId = req.user.id;

		const user = await User.findById(userId);
		if(!user){
			return res.status(400).json({message: "User not founded"});
		}

		if(user.role == "player"){
			res.status(200).json({profile: user.playerProfile});
		}else if(user.role == "club"){
			res.status(200).json({profile: user.clubProfile});
		}else{
			res.status(400).json({message: "Please selected role"});
		}
	}catch(error){
		console.error("Error in getProfile section: ", error);
		res.status(500).json({message: "Server error"});
	}
};