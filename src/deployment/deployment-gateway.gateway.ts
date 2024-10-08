import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { DeploymentService } from './deployment.service';

@WebSocketGateway({
  cors: {
    origin: '*', // Cho phép tất cả các origin
    credentials: true,
  },
})
export class DeploymentGatewayGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  constructor(private readonly deploymentService: DeploymentService) {}

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log(`Client connected: ${socket.id}`);
      this.server.emit('onMessage', {
        msg: 'Welcome to the deployment service!',
      });
    });
  }

  @SubscribeMessage('createVercelProject')
  async handleCreateVercelProject(@MessageBody() body: any) {
    try {
      const result = await this.deploymentService.createVercelProject(body);
      this.server.emit('onMessage', {
        msg: 'Vercel project creation initiated',
        data: result,
      });
    } catch (error) {
      this.server.emit('onMessage', {
        msg: 'Error during Vercel project creation',
        error: error.message,
      });
    }
  }
}
