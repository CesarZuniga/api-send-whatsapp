import { Body, Get, Post, Query, Route } from "tsoa"
import { WAState } from 'whatsapp-web.js';
import { MessageWA } from "../models/message";
import { WhatsappWeb } from "../whatsapp-web";
@Route("message")
export class MessageController {
    @Post()
    public async sendMessage(@Body() msg: MessageWA): Promise<any> {
        const state = await WhatsappWeb.getClient().getState();
        if (WAState.CONNECTED === state) {
            return WhatsappWeb.getClient().sendMessage(WhatsappWeb.getFormattedNumber(msg.number), msg.message);
        }
        return new Promise((resolve) => resolve('Falta iniciar sesion'));
    }
    @Get()
    public async SendMsg(@Query() msg: string, @Query() number: string): Promise<any> {
        if (number) {
            const state = await WhatsappWeb.getClient().getState();
            if (WAState.CONNECTED === state) {
                return WhatsappWeb.getClient().sendMessage(WhatsappWeb.getFormattedNumber(number), msg);
            }
        }
        return new Promise((resolve) => resolve('Falta iniciar sesion'));
    }
}
