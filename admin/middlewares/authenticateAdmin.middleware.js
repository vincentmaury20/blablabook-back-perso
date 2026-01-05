import jwt from "jsonwebtoken";

export function authenticateAdmin(req, res, next) {
   const token = req.cookies.authToken;

   // Pas de token → pas connecté → login
   if (!token) {
      return res.redirect("/admin/login");
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (err) {
      // Token invalide → accès refusé
      return res.status(403).render("errors/403", {
         title: "Accès refusé"
      });
   }
}