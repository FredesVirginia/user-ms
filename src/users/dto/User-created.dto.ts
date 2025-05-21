
import { IsString, IsEnum, IsOptional, IsUUID, IsNotEmpty } from 'class-validator';
import { TodoListState } from '../enums/enums';
import { NotIncludeWord } from './Custom-Validations/CustomValidator';

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty()
  @NotIncludeWord({
    message: "El título de la tarea no puede contener las palabras: test, prueba, default",
  })
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  month: string;

  @IsEnum(TodoListState)
  
  state: TodoListState;

  @IsString()
  @IsNotEmpty()
  content: string;
}


export class SearTodoListByKeyword {
  @IsString()
  @IsNotEmpty()
  word : string
}
