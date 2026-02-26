import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        console.log(`Validating user: ${email}`);
        const user = await this.usersService.findOne(email);
        if (!user) {
            console.log(`User not found: ${email}`);
            return null;
        }

        const isMatch = await bcrypt.compare(pass, user.password);
        console.log(`Password match for ${email}: ${isMatch}`);

        if (isMatch) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async validateUserById(id: string): Promise<any> {
        const user = await this.usersService.findById(id);
        if (user) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                elo: user.elo,
                puzzleRating: user.puzzleRating,
            }
        };
    }

    async register(email: string, pass: string, name?: string) {
        try {
            const existingUser = await this.usersService.findOne(email);
            if (existingUser) {
                throw new ConflictException('El correo electrónico ya está registrado');
            }

            const hashedPassword = await bcrypt.hash(pass, 10);
            const user = await this.usersService.create({
                email,
                password: hashedPassword,
                name,
            });
            const { password, ...result } = user;
            return result;
        } catch (error) {
            console.error('Error in registration:', error);
            throw error;
        }
    }
}
