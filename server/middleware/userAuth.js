import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.json({ success: false, message: "Not Authorized login again" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (tokenDecode.id) {
      req.body.userId = tokenDecode.id;
    } else {
      return res.json({
        success: false,
        message: "Not Authorized login again",
      });
    }

    next();
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export default userAuth;
