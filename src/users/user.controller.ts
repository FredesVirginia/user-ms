import { Body, Controller, Delete, Get, Param,  ParseUUIDPipe, Post } from '@nestjs/common';


import { Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/User-created.dto';

@Controller('users')
export class UserController {
    constructor (private readonly userService : UserService){}


    @Post()
    async createUser(@Body() userTodoListDto : CreateUserDto){
        const newTodoList = await this.userService.createUser(userTodoListDto)
        return newTodoList
    }

    @Get()
    async getAllUser(){
        return await this.userService.getAllUser()
    }

    @Get(':id')
    async getTodoListId(@Param('id' , new ParseUUIDPipe()) id: string){
        return this.userService.getIdTodoList(id)
    }


    @Delete(':id')
    async deleteTodoList(@Param('id' , new ParseUUIDPipe()) id:string){
        return this.userService.deleteTodoList(id)
    }

   
}
