import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './modules/database/config/typeorm.config';

import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([{
      ttl: 60, // Temps de vie des requêtes en secondes
      limit: 10, // Nombre de requêtes autorisées dans le temps de vie
    }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    AuthModule,
    // Ajoutez d'autres modules ici
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
