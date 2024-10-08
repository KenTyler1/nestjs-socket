/* eslint-disable @typescript-eslint/no-unused-vars */
//app.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { MyGateway } from './gateway/gateway';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly myGateway: MyGateway, // Inject the gateway
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send-message')
  sendMessage(): string {
    this.myGateway.server.emit('onMessage', {
      msg: 'New Message from Server',
    });
    return 'Message sent successfully';
  }
}
