import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';
import {
  MulterModuleOptions,
  MulterOptionsFactory,
} from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import * as _ from 'lodash';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

// config contants
export default () => ({
  port: parseInt(process.env.PORT, 10) || 5000,
  database:
    process.env.ENVIRONMENT === 'development'
      ? process.env.MONGODB_URI_DEV
      : process.env.MONGODB_URI,
  upload_path: './public/upload',
  jwtSecret: process.env.JWTSECRET,
  environment: process.env.ENVIRONMENT,
});

// get filename of file
export const getFilename = (str: string) => _.split(str, '.')[0];

/**
 * @class MongooseConfigService
 * @description Mongoose configuration service - Mongodb setup
 */
@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.configService.get<string>('database'),
      useFindAndModify: false,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    };
  }
}

/**
 * @class MulterConfigService
 * @description Multer configuration service -
 * Configuration for handling upload file
 *
 */
@Injectable()
export class MulterConfigService implements MulterOptionsFactory {
  constructor(private configService: ConfigService) {}
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: this.configService.get<string>('upload_path'),
        filename: (req, file, cb) => {
          const name = getFilename(file.originalname);
          return cb(null, `${name}${extname(file.originalname)}`);
        },
      }),
    };
  }
}

/**
 * @class JwtConfigService
 * @description Jwt configuration service -
 * Configuration for setting jwt options
 *
 */
@Injectable()
export class JwtConfigService implements JwtOptionsFactory {
  constructor(private configService: ConfigService) {}
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.configService.get('jwtSecret'),
      signOptions: {
        expiresIn: '1hr',
      },
    };
  }
}
