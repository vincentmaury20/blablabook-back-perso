import { Router } from "express";
import { adminBookController } from "../controllers/admin.book.controller.js";
import { authenticateAdmin } from "../middlewares/authenticateAdmin.middleware.js";
// import multer from "multer";
// const upload = multer({ dest: "uploads/books/images" });

import { isAdmin } from "../middlewares/isAdmin.middleware.js";
import upload from "../../middlewares/uploadCover.middleware.js";
export const adminBookRouter = Router();

adminBookRouter.get("/admin/books", authenticateAdmin, isAdmin, adminBookController.getBooks);
adminBookRouter.get("/admin/book/create", authenticateAdmin, isAdmin, adminBookController.createBookForm);
adminBookRouter.post("/admin/book", authenticateAdmin, isAdmin, upload.single("cover"), adminBookController.createBook);
adminBookRouter.get("/admin/book/:id", authenticateAdmin, isAdmin, adminBookController.getBookById);
adminBookRouter.get("/admin/book/:id/edit", authenticateAdmin, isAdmin, adminBookController.editBookForm);
adminBookRouter.put("/admin/book/:id", authenticateAdmin, isAdmin, upload.single("cover"), adminBookController.updateBook);
adminBookRouter.delete("/admin/book/:id", authenticateAdmin, isAdmin, adminBookController.deleteBook);