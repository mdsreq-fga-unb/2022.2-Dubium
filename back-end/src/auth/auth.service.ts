import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Usuario } from 'src/usuarios/entities/usuario.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(user) {
    const payload = { sub: user.id, email: user.email };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, senha: string){
    let user: Usuario;
    try {
      user = await this.userService.findOneBy({ email });
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(senha, user.senha);
    if (!isPasswordValid) return null;

    return user;
  }
}
