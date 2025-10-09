import multer from 'multer';
import path from 'path';

const avatarStorage = multer.diskStorage({
   destination: (req, file, cb) => cb(null, 'uploads/avatars/'),
   filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, 'avatar-' + uniqueSuffix + ext);
   }
});

const fileFilter = (req, file, cb) => {
   const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
   if (allowedTypes.includes(file.mimetype)) cb(null, true);
   else cb(new Error('Type de fichier non autorisé'));
};

const avatarUpload = multer({ storage: avatarStorage, fileFilter });

export default avatarUpload;






//  name: "Lecteur",
//   firstname: "Léon",
//   email: "leon@blablabook.fr",
//   password: "Livre123!",
//   age: 34,
//   avatar: [fichier image type JPEG ou PNG]

//   "name": "Romancier",
//   "firstname": "Clara",
//   "email": "clara.romancier@blablabook.fr",
//   "password": "PlumeDorée2025!",
//   "confirm": "PlumeDorée2025!",
//   "age": 28,
//   "avatar": 