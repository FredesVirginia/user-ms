import { Body, Controller, Delete, Get, Param,  ParseUUIDPipe, Post } from '@nestjs/common';

import { CreateTodoListDto, SearTodoListByKeyword } from './dto/User-created.dto';
import { Payload } from '@nestjs/microservices';
import { UserService } from './user.service';

@Controller('todo-list')
export class UserController {
    constructor (private readonly todoListServices : UserService){}


    @Post()
    async createTodoList(@Body() createTodoListDto : CreateTodoListDto){
        const newTodoList = await this.todoListServices.createTodoList(createTodoListDto)
        return newTodoList
    }

    @Get()
    async getAllTodoList(){
        return await this.todoListServices.getAllTodoList()
    }

    @Get(':id')
    async getTodoListId(@Param('id' , new ParseUUIDPipe()) id: string){
        return this.todoListServices.getIdTodoList(id)
    }


    @Delete(':id')
    async deleteTodoList(@Param('id' , new ParseUUIDPipe()) id:string){
        return this.todoListServices.deleteTodoList(id)
    }

    @Post('search-todo-list-by-keyword')
    async searchTodoListByKeyword(@Body() dto : SearTodoListByKeyword){
        return this.todoListServices.lookForTodoListByKeyWord(dto.word)
    }
}
