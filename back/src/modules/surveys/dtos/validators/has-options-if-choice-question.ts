import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { QuestionType } from '../../enums/question-type.enum';


@ValidatorConstraint({ name: 'hasOptionsIfChoiceQuestion', async: false })
export class HasOptionsIfChoiceQuestion implements ValidatorConstraintInterface {
  validate (_: any, args: ValidationArguments) {
    const question = args.object as any;
    const isChoice = [QuestionType.SINGLE_CHOICE, QuestionType.MULTIPLE_CHOICE].includes(question.type);
    if (!isChoice) return true;
    return Array.isArray(question.options) && question.options.length >= 2;
  }

  defaultMessage (args: ValidationArguments) {
    return 'Choice-type questions must have at least 2 options';
  }
}
