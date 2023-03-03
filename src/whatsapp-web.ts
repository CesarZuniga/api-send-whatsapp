const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true,args: 
        [
            "--hide-scrollbars",
            "--disable-web-security",
            "--no-sandbox",
            "--disable-setuid-sandbox",] 
    }
});
export class WhatsappWeb {
    static Inicia() {
        client.on('qr', (qr: any) => {
            qrcode.generate(qr, { small: true });
        });
        client.on('ready', () => {
            console.log('Client is ready!');
        });
        client.initialize();
    }
    static getClient() {
        return client;
    }
    static getFormattedNumber(number:string ): string {
        return `${number}@s.whatsapp.net`;
    }
}