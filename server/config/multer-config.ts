import { v4 as uuid } from 'uuid';
import { Request } from 'express';

const filename = (
  req: Request,
  file: Express.Multer.File,
  cb: (error: Error, filename: string) => void,
) => {
  const mimetype: string = file.mimetype.split('/')[1];

  const filename: string = uuid() + '.' + mimetype;
  cb(null, filename);
};

export const multerProductConfig = {
  destination: './public/uploads/products',
  filename,
};
