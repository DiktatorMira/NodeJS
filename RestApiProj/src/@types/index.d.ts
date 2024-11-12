import { File } from 'multer';

declare global {
    namespace Express {
        export interface Request { files?: File[]; }
    }
}