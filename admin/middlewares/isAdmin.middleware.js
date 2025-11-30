// admin/middlewares/isAdmin.middleware.js
export const isAdmin = (req, res, next) => {
   if (req.user && req.user.role === "admin") {
      return next();
   }
   return res.redirect("/admin/login");
};