import { IsOptional, IsString, IsIn } from 'class-validator'

export class IssuesPaginationDto {
  @IsOptional()
  take?: string

  @IsOptional()
  period?: string

  @IsOptional()
  @IsString()
  area?: string

  @IsOptional()
  @IsIn(['CLAIM', 'COMPLAINT'])
  issueType?: string

  @IsOptional()
  page?: string

  @IsOptional()
  @IsString()
  account?: string
}
