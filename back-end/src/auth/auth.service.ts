import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usarioService: UsuariosService,
    private jwtService: JwtService
  ) { }

  async validarUsuario(username: string, pass: string): Promise<any> {
    const usuario = await this.usarioService.findByEmail(username);
    if (usuario && (pass === usuario.password)) {
      const { password, ...result } = usuario;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
