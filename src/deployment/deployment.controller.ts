import { Controller, Post, Body } from '@nestjs/common';
import { DeploymentService } from './deployment.service';
import { CreateProjectDto } from './dto/createproject.dto';

@Controller('deployment')
export class DeploymentController {
  constructor(private readonly deploymentService: DeploymentService) {}

  @Post('/create-vercel-project')
  async createVercelProject(@Body() body: CreateProjectDto) {
    return this.deploymentService.createVercelProject(body);
  }
}
