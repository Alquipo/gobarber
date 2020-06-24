import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error(' Email/Senha incorreta');
    }

    // user.password - senha criptografada
    // passowrd - senha nao criptografada

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error(' Email/Senha incorreta');
    }

    // usuario autenticado
    const token = sign({}, '34340f6187c62fdecd780f840ab20dcb', {
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
