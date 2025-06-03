import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysModule } from './modules/surveys/surveys.module';
import { Survey } from './modules/surveys/entities/survey.entity';
import { Question } from './modules/surveys/entities/question.entity';
import { Option } from './modules/surveys/entities/option.entity';
import { Answer } from './modules/surveys/entities/answer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get('database');
        return {
          type: 'postgres',
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.name,
          autoLoadEntities: true,
          synchronize: true,
          entities: [Survey, Question, Option, Answer],
        };
      },
    }),
    SurveysModule,
  ],
})
export class AppModule {}
