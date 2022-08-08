import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';

export enum FileType {
  IMAGE = 'image',
  VIDEO = 'video',
}

@Injectable()
export class FileService {
  createFile(type: FileType, file: any): string {
    try {
      const fileExtension = file.originalname.split('.').pop();
      const fileName = uuid.v4() + '.' + fileExtension;
      const filePath = path.resolve(__dirname, '..', 'static', type);
      console.log(`FileExtension - ${fileExtension}`);
      console.log(`FileName - ${fileName}`);
      console.log(`FilePAth - ${filePath}`);

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      fs.writeFileSync(path.resolve(filePath, fileName), file.buffer);
      return type + '/' + fileName;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteFile(file: string) {
    const fileName = file.split('/').pop();
    const fileType = file.split('/').shift();
    const filePath = path.resolve(__dirname, '..', 'static', fileType);

    fs.unlink(filePath + '/' + fileName, (err) => {
      if (err) throw err;
      console.log(`${file} - file was deleted`);
    });
  }
}
