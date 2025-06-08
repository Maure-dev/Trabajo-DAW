import { Body, Controller, Param, Post, Get, Put, Delete, Patch, Query, ParseUUIDPipe } from '@nestjs/common';
import { CreateSurveyDto } from '../dtos/create-survey.dto';
import { SurveyResponseDto } from '../dtos/survey-response.dto';
import { SurveysService } from '../services/surveys.service';
import { plainToInstance } from 'class-transformer';
import { Survey } from '../entities/survey.entity';
import { GetSurveysQueryDto } from '../dtos/get-surveys-query.dto';
import { SurveyPublicDto } from '../dtos/survey-public.dto';
import { SurveyStatusDto } from '../dtos/survey-status.dto';

@Controller('surveys')
export class SurveysController {
  constructor(private readonly surveysService: SurveysService) {}

  @Post()
  create(@Body() createSurveyDto: CreateSurveyDto): Promise<Survey> {
    return this.surveysService.createSurvey(createSurveyDto);
  }

  @Get()
  async getByStatus (@Query() query: GetSurveysQueryDto): Promise<SurveyPublicDto[]> {
    const surveys = await this.surveysService.getSurveysByStatus(query.status);
    return plainToInstance(SurveyPublicDto, surveys, { excludeExtraneousValues: true });
  }

  @Get(':id')
  async getById (@Param('id', ParseUUIDPipe) id: string): Promise<SurveyPublicDto> {
    const survey = await this.surveysService.getSurveyById(id);
    return plainToInstance(SurveyPublicDto, survey, { excludeExtraneousValues: true });
  }

  @Get('participate/:link')
  async getSurveyForParticipation (@Param('link') link: string) {
    return this.surveysService.getSurveyForParticipation(link);
  }

  @Get('results/:link')
  async getSurveyResults (@Param('link') link: string) {
    return this.surveysService.getSurveyResults(link);
  }

  @Put(':id')
  async updateSurvey (
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: CreateSurveyDto,
  ): Promise<SurveyResponseDto> {
    const updatedSurvey = await this.surveysService.updateSurvey(id, dto);
    return plainToInstance(SurveyResponseDto, updatedSurvey, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  async deleteSurvey (@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    await this.surveysService.deleteSurvey(id);
  }

  @Patch(':id/status')
  async changeStatus (
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<SurveyStatusDto> {
    const updatedSurvey = await this.surveysService.changeSurveyStatus(id);
    return plainToInstance(SurveyStatusDto, updatedSurvey, {
      excludeExtraneousValues: true,
    });
  }
}
