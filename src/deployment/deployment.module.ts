import { Module } from '@nestjs/common';
import { DeploymentGatewayGateway } from './deployment-gateway.gateway';
import { DeploymentController } from './deployment.controller';
import { DeploymentService } from './deployment.service';
import { VercelService } from './providers/vercel/vercel.service';

@Module({
  providers: [DeploymentGatewayGateway, DeploymentService, VercelService],
  controllers: [DeploymentController],
  exports: [DeploymentService],
})
export class DeploymentModule {}
