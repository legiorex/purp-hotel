import { Injectable } from '@nestjs/common';
import { StatisticRepository } from './statistic.repository';
import { StatisticByRangeDto } from './dto/statistic.dto';

@Injectable()
export class StatisticService {
  constructor(private readonly statisticRepository: StatisticRepository) {}

  async getStatisticByRange(dto: StatisticByRangeDto) {
    const start = new Date(dto.start);
    const end = new Date(dto.end);
    return await this.statisticRepository.getStatisticByRange({ start, end });
  }
}
