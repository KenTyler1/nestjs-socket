import { HttpStatus, Injectable } from '@nestjs/common';
import { VercelService } from './providers/vercel/vercel.service';
import { CreateProjectDto } from './dto/createproject.dto';

@Injectable()
export class DeploymentService {
  constructor(private readonly vercelService: VercelService) {}

  async createVercelProject(body: CreateProjectDto) {
    const { prodiver_name } = await this.vercelService.getProviderInfo(
      body.theme_id,
    );
    if (prodiver_name === 'vercel') {
      return this.vercelService.createVercelProjectAndInitDeploy(body);
    }
    return {
      status: HttpStatus.BAD_REQUEST,
      message: 'Provider not supported',
    };
  }
}
