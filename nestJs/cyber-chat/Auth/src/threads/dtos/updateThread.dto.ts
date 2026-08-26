import { CreateThreadDto } from './createThread.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateThreadDto extends PartialType(CreateThreadDto) {}
