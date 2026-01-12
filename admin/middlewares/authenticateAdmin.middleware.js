import jwt from "jsonwebtoken";

export function authenticateAdmin(req, res, next) {
  const token = req.cookies.authToken;

  if (!token) {
    return res.redirect("/admin/login");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).render("errors/403", {
      title: "Accès refusé",
    });
  }
}
