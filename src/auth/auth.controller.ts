import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { DeleteUserDto } from './dto/delete.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PublicRoute } from './common/guard/decorators/public.decorator';
@ApiBearerAuth()
@PublicRoute()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @PublicRoute()
  @Post('login')
  async verifyLogin(@Body() body:LoginDto) {
    return await this.authService.verifyLogin(body);
  }
@PublicRoute()
  @Post("register")
  async createUser(@Body() body: RegisterDto) {
    return await this.authService.createUser(body);
  }
    @Post("delete")
  async deleteUser(@Body() body: DeleteUserDto) {
    return await this.authService.deleteUser(body.userId);
  }
  
}
