const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied." });
        const key = "akfnaernfergnrenvrngvoerignrgnv";  
    const verified = jwt.verify(token, key);
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    req.user = verified.id;
    console.log(verified)
    
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = auth;
