import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import  UnauthorizedException from 'App/Exceptions/UnauthorizedException';
export default class Auth {
  public async handle({ auth }: HttpContextContract, next: () => Promise<void>) {
    if (!auth.isAuthenticated) {
      throw new UnauthorizedException('User is not authenticated');
    }
  
    await next()

   
  }
}
