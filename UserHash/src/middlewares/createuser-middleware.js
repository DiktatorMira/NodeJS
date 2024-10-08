import { users } from "../data/users.js";
import bcrypt from "bcrypt";
import multer from "multer";
import path from "path";

const upload = multer({
    dest: 'public/images/avatars/',
    limits: { fileSize: 1000000 },
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (extname && mimetype) return cb(null, true);
        else cb('Error: Images only!');
    }
});
export const createUser = [
    upload.single('avatar'),
    (req, res, next) => {
        const { login, email, password } = req.body;
        const user = users.find((el) => el.login === login || el.email === email);
        if (!user) {
            const avatarUrl = req.file ? `/images/avatars/${req.file.filename}` : '/images/avatars/default.png';
            users.push({
                id: users.length + 1,
                login: login,
                email: email,
                password: bcrypt.hashSync(password, 10),
                avatarUrl: avatarUrl
            });
            next();
            return;
        }
        res.status(400);
        res.redirect("/");
    }
];