import { IsDateString } from 'class-validator';
import { IsBefore } from 'src/common/validators/date-range.validator';

export class StatisticByRangeDto {
  @IsDateString()
  @IsBefore('end')
  start: Date;

  @IsDateString()
  end: Date;
}
