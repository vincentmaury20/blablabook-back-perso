import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { xss } from "express-xss-sanitizer";
import { publicRouter } from "./routers/index.js";
import { adminRouters } from './admin/routers/index.js';
import path from "path";
import methodOverride from "method-override";


const PORT = process.env.PORT || 3000;
const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(process.cwd(), "admin/views"));

app.use("/admin", express.static("public"))


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(xss());


app.use(cookieParser());

app.use(methodOverride("_method"));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use(publicRouter);
app.use(adminRouters);

app.listen(PORT, () => {
  console.log(`BlaBlaBook 📘📗📕 is "reading" 👍 on http://localhost:${PORT}`);
});
