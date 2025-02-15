import bcrypt from "bcrypt";

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


   } catch (error) {
    
   }
}