import jwt from "jsonwebtoken";

export function authenticate(req, res, next) {
  // 🔑 Récupérer le token soit dans le header, soit dans la query string
  const authHeader = req.headers.authorization;
  const headerToken = authHeader && authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  const queryToken = req.query.token;
  const token = headerToken || queryToken;

  if (!token) {
    return res.status(403).json({
      error: "You can't have access to this resource, please authentify",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Stocker l'utilisateur décodé dans req.user
    req.user = decoded;
    next();
  } catch (err) {
    console.error("JWT error:", err.message);
    return res.status(403).json({
      error: "Your token is invalid or has expired",
    });
  }
}