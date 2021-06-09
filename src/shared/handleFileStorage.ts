import { diskStorage } from 'multer';
import { extname } from 'path';
import * as _ from 'lodash';

// get filename of file
export const getFilename = (str: string) => _.split(str, '.')[0];

const handleFileStorage = {
  storage: (destination = './public/upload') => {
    return diskStorage({
      destination,
      filename: (req, file, cb) => {
        const name = getFilename(file.originalname);
        return cb(null, `${name}${extname(file.originalname)}`);
      },
    });
  },
};

export default handleFileStorage;
