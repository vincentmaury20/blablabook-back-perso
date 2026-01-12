export const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }

  return res.status(403).render("errors/403", {
    title: "Accès refusé",
  });
};
