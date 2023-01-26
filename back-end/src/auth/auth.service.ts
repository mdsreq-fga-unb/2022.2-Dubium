import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsuariosService } from 'src/usuarios/usuarios.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsuariosService,
    private jwtService: JwtService,
  ) { }

  async validarUsuario(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(username);
    if (user && bcrypt.compareSync(pass, user.senha)) {
      const { senha, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}