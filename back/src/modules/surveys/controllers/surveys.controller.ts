import { Body, Controller, Param, Post, Get, Put, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { UpdateSurveyDto } from '../dtos/update-survey.dto';
import { SurveyResponseDto } from '../dtos/survey-response.dto';
import { SurveysService } from '../services/surveys.service';
import { plainToInstance } from 'class-transformer';
import { Survey } from '../entities/survey.entity';
import { GetSurveysQueryDto } from '../dtos/get-surveys-query.dto';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveysService.createSurvey(createSurveyDto);
  }

  @Get()
  getByStatus (@Query() query: GetSurveysQueryDto): Promise<Survey[]> {
    return this.surveysService.getSurveysByStatus(query.status);
  }

  @Get(':id')
  getById (@Param('id', ParseUUIDPipe) id: string): Promise<Survey> {
    return this.surveysService.getSurveyById(id);
  }

  @Put(':id')
  async updateSurvey(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateSurveyDto,
  ): Promise<SurveyResponseDto> {
    const updatedSurvey = await this.surveysService.updateSurvey(id, dto);
    return plainToInstance(SurveyResponseDto, updatedSurvey, {
      excludeExtraneousValues: true,
    })
  }
}
