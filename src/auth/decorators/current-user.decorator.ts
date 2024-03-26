import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { AuthRequest } from "../models/AuthRequest";
import { UserEntity } from "src/resource/usuarios/entidades/user-entity";

export const CurrentUser = createParamDecorator(
    (data: unknown, context: ExecutionContext): UserEntity => {
        const request = context.switchToHttp().getRequest<AuthRequest>();

        return request.user
    }
)