// admin/middlewares/authenticateAdmin.middleware.js
import jwt from "jsonwebtoken";

export function authenticateAdmin(req, res, next) {
   const token = req.cookies.authToken; // lecture du cookie

   if (!token) {
      return res.redirect("/admin/login");
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
   } catch (err) {
      return res.redirect("/admin/login");
   }
}