import { Router } from "express";
import { adminReviewController } from "../controllers/index.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
import { isAdmin } from "../middlewares/isAdmin.middleware.js";

export const adminReviewRouter = Router();

//tout d'abord la liste des reviews tout comme les autres entités

adminReviewRouter.get('/admin/reviews', authenticateAdmin, isAdmin, adminReviewController.getReviews);

// Le formulaire de création d'une review est déjà géré côté user donc ne pas le refaire ici me parait ok
//donc on passe à la création directe
adminReviewRouter.post('/admin/review', authenticateAdmin, isAdmin, adminReviewController.createReview);

// pour l'édition ce sera seulement également une route pour l'admin , disons si il y a des fautes ou encore des abus donc il y a besoin d'un formulaire prévu à cet effet
adminReviewRouter.get('/admin/review/:id/edit', authenticateAdmin, isAdmin, adminReviewController.editReviewForm);

// ensuite pour l'update et vu que j'utilise le method override dans les formulaires je peux faire un put ici
adminReviewRouter.put('/admin/review/:id', authenticateAdmin, isAdmin, adminReviewController.updateReview);

// finalement il faut gérer la suppression et normalement ce sera tout pour le CRUD
adminReviewRouter.delete('/admin/review/:id', authenticateAdmin, isAdmin, adminReviewController.deleteReview);


//  une route pour le toggle de publish ou non d'une review....

adminReviewRouter.post('/admin/review/:id/toggle', authenticateAdmin, isAdmin, adminReviewController.togglePublish);

// Pour ce qui est de l'ordre des routes en gnéral on procède ainsi:
// - La liste 
// - le formulaire de création si besoin
// - la création
// - le formulaire d'édition
// - la mise à jour
// - la suppression

// pour éviter les conflits lors des appels des routes dans le serveur principal