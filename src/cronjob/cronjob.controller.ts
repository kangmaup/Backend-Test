import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CronjobService } from './cronjob.service';
import { CreateCronjobDto } from './dto/create-cronjob.dto';
import { UpdateCronjobDto } from './dto/update-cronjob.dto';

@Controller('cronjob')
export class CronjobController {
  constructor(private readonly cronjobService: CronjobService) {}

}
