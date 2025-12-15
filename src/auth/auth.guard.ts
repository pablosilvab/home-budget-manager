
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';

/**
 * AuthGuard es una clase que implementa la interfaz CanActivate de Nest.js
 * CanActivate es una interfaz que define un método canActivate que se ejecuta antes de que se ejecute un controlador
 * Este guardia tiene como objetivo verificar si el token JWT es válido
 * Los Guards en NestJs son clases que implementan una interfaz específica y que se utilizan para proteger rutas. 
 * Los Guards se ejecutan antes de que se ejecute un controlador y pueden permitir o denegar el acceso a la ruta.
 */
@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );
            request['user'] = payload;
        } catch {
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
