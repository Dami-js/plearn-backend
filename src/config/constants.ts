import { Injectable } from '@nestjs/common';
import { ConfigModuleOptions, ConfigService } from '@nestjs/config';
import configuration from './configuration';

export const CONFIG_MODULE_OPTIONS: ConfigModuleOptions = {
  isGlobal: true,
  load: [configuration],
};
