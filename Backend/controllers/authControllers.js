const Undergrad_student = require("../models/undergrad_student");
const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

// @desc Login
// @route POST /auth
// @access Public
const login = asyncHandler(async (req, res) => {
  const { role, email, password } = req.body;

  if (!email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  let Collection;
  switch (role) {
    case "admin":
      Collection = Admin;
      break;
    case "undergraduate":
      Collection = Undergrad_student;
      break;
    default:
      return res.status(401).json({ message: "Invalid role" });
     
  }

  const foundUser = await Collection.findOne({ email }).exec();

  if (!foundUser || !foundUser.isActive) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const match = await bcrypt.compare(password, foundUser.password);

  if (!match) return res.status(401).json({ message: "Unauthorized" });

  const accessToken = jwt.sign(
    {
      UserInfo: {
       ...foundUser
      },
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "15m" }
  );

  const refreshToken = jwt.sign(
    {
      UserInfo: {
        ...foundUser
      },
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "2d" }
  );

  // Create secure cookie with refresh token
  res.cookie("jwt", refreshToken, {
    httpOnly: true, //accessible only by web server
    // secure: true, //https
    sameSite: "Lax", //cross-site cookie
    maxAge: 2 * 24 * 60 * 60 * 1000, //cookie expiry: set to match rT
  });

  // Send accessToken containing email and roles
  res.json({ accessToken });
});

// @desc Refresh
// @route GET /auth/refresh
// @access Public - because access token has expired
const refresh = (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.status(401).json({ message: "Unauthorized" });

  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    asyncHandler(async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
console.log(decoded);
      let Collection;
      switch (decoded.UserInfo._doc.role) {
        case "admin":
          Collection = Admin;
          break;
        case "undergraduate":
          Collection = Undergrad_student;
          break;
        default:
          return res.status(401).json({ message: "Invalid role" });
      }
      const foundUser = await Collection.findOne({ email: decoded.UserInfo._doc.email }).exec();

      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });

      const accessToken = jwt.sign(
        {
          UserInfo: {
            ...foundUser
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      res.json({ accessToken });
    })
  );
};

// @desc Logout
// @route POST /auth/logout
// @access Public - just to clear cookie if exists
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie cleared" });
};

module.exports = {
  login,
  refresh,
  logout,
};
