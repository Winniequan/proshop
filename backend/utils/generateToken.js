import jwt from "jsonwebtoken";

const generateToken = (res, userId) => {
    const token = jwt.sign({ userId}, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
    // set jwt as HTTP only cookie

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSiste: "restrict",
      maxAge: 1000 * 60 * 60 * 24 * 30, //30days
    });
}

export default generateToken;