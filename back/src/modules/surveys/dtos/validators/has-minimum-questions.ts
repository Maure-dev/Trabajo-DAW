import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'hasMinimumQuestions', async: false })
export class HasMinimumQuestions implements ValidatorConstraintInterface {
  validate (questions: any[], args: ValidationArguments) {
    return Array.isArray(questions) && questions.length >= 1;
  }

  defaultMessage (args: ValidationArguments) {
    return 'The survey must contain at least one question';
  }
}
