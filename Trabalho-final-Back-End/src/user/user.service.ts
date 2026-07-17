import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import type { User } from './interfaces/user.interface';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const saltOrRouds = 10;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    const passwordHashed = await hash(createUserDto.senha, saltOrRouds);
    const user: User = {
      ...createUserDto,
      id: this.users.length + 1,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      senha: passwordHashed,
    };
    this.users.push(user);
    return user;
  }

  getAllUsers(): User[] {
    return this.users;
  }
}
