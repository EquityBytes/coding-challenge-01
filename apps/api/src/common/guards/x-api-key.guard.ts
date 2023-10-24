import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class XApiKeyGuard implements CanActivate {
  canActivate(context: ExecutionContext): true | never {
    //TODO: Authorize the request if the 'x-api-key' header is set to 'secretkey'
  }
}
