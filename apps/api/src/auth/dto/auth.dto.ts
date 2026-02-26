import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsString()
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password: string;

    @IsOptional()
    @IsString()
    name?: string;
}

export class LoginDto {
    @IsEmail({}, { message: 'Email inválido' })
    email: string;

    @IsString()
    password: string;
}
