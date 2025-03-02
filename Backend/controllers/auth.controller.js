export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email });
		if (!user) {  // ❌ You had `if (!email)`, which is incorrect
			return res.status(400).json({ message: "Invalid email" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid password" });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2d' });
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 2 * 24 * 60 * 60 * 1000
		});

		res.json({ message: "Logged in successfully", token, userId: user._id });
	} catch (error) {
		console.error("Error in login:", error);
		res.status(500).json({ message: "Server error" });
	}
};
