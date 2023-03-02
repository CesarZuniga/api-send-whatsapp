import { Body, Get, Post, Route } from "tsoa"
import  { WAState } from 'whatsapp-web.js';
import { MessageWA } from "../models/message";
import client from "../whatsappweb";

@Route("message")
export class MessageController {
    @Post()
    public async sendMessage(@Body() msg: MessageWA): Promise<any> {
        const state = await client.getState();
        if (WAState.CONNECTED === state){
           return client.sendMessage(msg.number, msg.message);
        }        
        return new Promise((resolve) => resolve('Falta iniciar sesion'));
    }
    @Get("/login")
    public async Login(): Promise<string> {
        const state = await client.getState();
        if (WAState.CONNECTED !== state){
            client.initialize();
            return 'Inciado procesod de login';
        }        
        return 'sesion activa';
    }
    @Get('/logout')
    public async Logout(): Promise<string> {
        const state = await client.getState();
        if (WAState.CONNECTED === state){
            await client.logout();
            return 'cerro sesion correctamente';
        }        
        return 'sin sesion activa';
    }
}
