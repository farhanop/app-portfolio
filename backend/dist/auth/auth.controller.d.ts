import type { Response } from 'express';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(req: any, response: Response): Promise<{
        message: string;
        user: {
            username: any;
            sub: any;
            role: any;
        };
    }>;
    logout(response: Response): Promise<{
        message: string;
    }>;
    getProfile(req: any): any;
}
