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

import { RpcException } from '@nestjs/microservices';
import { CreateUserDto } from './dto/User-created.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto) {
    try {
      const userNew = await this.userRepository.save(userDto);
      return userNew;
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

  async getAllUser() {
    try {
      const allUser = await this.userRepository.find();
      return allUser;
    } catch (error) {
      throw new RpcException({
        HttpStatus: HttpStatus.BAD_REQUEST,
      });
    }
  }

  async getIdTodoList(id:string){
    const todoListId = await this.userRepository.findOneBy({id})
    if(!todoListId){
      throw new NotFoundException("Tarea no encontrada")
    }
    return {
      status : HttpStatus.ACCEPTED,
      data : todoListId
    }
  }

  async deleteTodoList(id: string) {
    const todoList = await this.userRepository.findOneBy({ id });
    if (!todoList) {
      throw new NotFoundException('Tarea no encontrada');
    }

    const data = await this.userRepository.remove(todoList);
    return {
      status: HttpStatus.ACCEPTED,
      data,
    };
  }


  // async lookForTodoListByKeyWord( word : string){
  //   const todoList = await this.todoListRepository.find({
  //     where : [
  //       {title : ILike(`%${word}%`)},
  //       {description : ILike(`%${word}%`)},
  //       {content : ILike(`%${word}%`)}
  //     ]
  //   })

  //    if(!todoList){
  //     throw new NotFoundException(`No se encontraron tareas con la palabra clave ${word}`)
  //    }

  //    return todoList
  // }
}
