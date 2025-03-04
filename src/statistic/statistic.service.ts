import { Injectable } from '@nestjs/common';
import { StatisticRepository } from './statistic.repository';

@Injectable()
export class StatisticService {
  constructor(private readonly statisticRepository: StatisticRepository) {}

  async getStatisticByRange() {
    return await this.statisticRepository.findAll();
  }
}
