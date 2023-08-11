exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({
      username,
      email,
      password,
    });
    res.json(user);
  } catch (err) {
    res.status(400).json(err);
  }
};
