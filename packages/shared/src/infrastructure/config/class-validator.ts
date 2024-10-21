import { ValidatorOptions } from "class-validator";

export interface ValidatorPipeOptions extends ValidatorOptions{
   transform ?: true;
   disableErrorMessages ?: true;
}