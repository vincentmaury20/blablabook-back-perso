import multer from 'multer';
import path from 'path';


// Définir le stockage
const storage = multer.diskStorage({
   destination: (req, file, cb) => {
      // Rendre le chemin absolu pour garantir la stabilité
      const destinationPath = path.join(process.cwd(), 'uploads', 'books', 'images');
      console.log("MULTER VA ÉCRIRE ICI :", destinationPath);


      cb(null, destinationPath);
   },
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      // Utiliser le nom de fichier directement (req.file.filename contiendra ça)
      cb(null, `cover-${uniqueSuffix}${ext}`);
   }
});

// Filtrage des types de fichiers
const fileFilter = (req, file, cb) => {
   const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
   if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
   } else {
      cb(new Error('Type de fichier non autorisé'));
   }
};

// Création du middleware
const upload = multer({ storage, fileFilter });
export default upload;

