import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { UpdateSurveyDto } from '../dtos/update-survey.dto';
import { SurveysService } from '../services/surveys.service';
import { plainToInstance } from 'class-transformer';
import { Survey } from '../entities/survey.entity';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto) {
    return this.surveysService.createSurvey(createSurveyDto);
  }

  @Put(':id')
  async updateSurvey(
    @Param('id') id: string,
    @Body() dto: UpdateSurveyDto,
  ) {
    const updatedSurvey = await this.surveysService.updateSurvey(id, dto);
    return plainToInstance(Survey, updatedSurvey, {
      excludeExtraneousValues: true,
    })
  }
}
