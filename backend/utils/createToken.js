import jwt from "jsonwebtoken"
// import cookies from "cookie-parser"

export const createToken = async (userID, res) => {
    const token = jwt.sign({ userID }, process.env.SECRET_KEY, { expiresIn: "30d" });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: false,
        maxAge: 30 * 24 * 60 * 60 * 1000,
        
    });
    return token;

}
