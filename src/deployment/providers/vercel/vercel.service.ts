/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class VercelService {
  async getProviderInfo(themeId: string) {
    // Giả định lấy thông tin provider từ cơ sở dữ liệu
    return { prodiver_name: 'vercel', auth_token: 'your-auth-token' };
  }

  async createVercelProjectAndInitDeploy(body: any) {
    const projectName = `${body.theme_id}-${body.user_id}-${body.channel_id}-${Date.now()}`;
    const step1Url = `https://api.vercel.com/v9/projects`;

    const { data: projectData } = await axios.post(
      step1Url,
      {
        name: projectName,
        framework: 'nextjs',
      },
      {
        headers: {
          Authorization: `Bearer your-auth-token`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (!projectData.id) {
      return {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Vercel project not created',
      };
    }
    return { status: HttpStatus.OK, projectData };
  }
}
