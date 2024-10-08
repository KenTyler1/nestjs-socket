//app.module.ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MyGateway } from './gateway/gateway';

import { DeploymentModule } from './deployment/deployment.module';

@Module({
  imports: [DeploymentModule],
  controllers: [AppController],
  providers: [AppService, MyGateway],
})
export class AppModule {}
