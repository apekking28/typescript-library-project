import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMemberDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty()
  name: string;
}
