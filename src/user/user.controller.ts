import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { UserRepository } from './repository/user.repository';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post('/')
  @UsePipes(ValidationPipe)
  async create(@Body() data: CreateUserDto): Promise<unknown> {
    return await this.userRepository.create(data);
  }

  @Get('/')
  async findAll(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userRepository.findById(Number(String(id)));
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() data: Partial<User>,
  ): Promise<User> {
    return this.userRepository.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.userRepository.delete(id);
  }
}
