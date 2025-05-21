import {
  BadRequestException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import {User} from "./entity/user.entity"
import { ILike, Repository } from 'typeorm';
import { CreateTodoListDto } from './dto/User-created.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private todoListRepository: Repository<User>,
  ) {}

  async createTodoList(todoListDto: CreateTodoListDto) {
    try {
      const todoListNew = await this.todoListRepository.save(todoListDto);
      return todoListNew;
    } catch (error) {
      console.log('EEROR FUE ', error);

      if (error.name === 'QueryFailedError') {
        throw new BadRequestException(
          'Datos inválidos o violación de restricciones',
        );
      }

      throw new InternalServerErrorException('Error interno del servidor');
    }
  }

  async getAllTodoList() {
    try {
      const allTodoList = await this.todoListRepository.find();
      return allTodoList;
    } catch (error) {
      throw new RpcException({
        HttpStatus: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async getIdTodoList(id:string){
    const todoListId = await this.todoListRepository.findOneBy({id})
    if(!todoListId){
      throw new NotFoundException("Tarea no encontrada")
    }
    return {
      status : HttpStatus.ACCEPTED,
      data : todoListId
    }
  }

  async deleteTodoList(id: string) {
    const todoList = await this.todoListRepository.findOneBy({ id });
    if (!todoList) {
      throw new NotFoundException('Tarea no encontrada');
    }

    const data = await this.todoListRepository.remove(todoList);
    return {
      status: HttpStatus.ACCEPTED,
      data,
    };
  }


  async lookForTodoListByKeyWord( word : string){
    const todoList = await this.todoListRepository.find({
      where : [
        {title : ILike(`%${word}%`)},
        {description : ILike(`%${word}%`)},
        {content : ILike(`%${word}%`)}
      ]
    })

     if(!todoList){
      throw new NotFoundException(`No se encontraron tareas con la palabra clave ${word}`)
     }

     return todoList
  }
}
