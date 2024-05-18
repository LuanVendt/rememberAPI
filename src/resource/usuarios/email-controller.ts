import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";
import { sendEmail } from "src/utils/send-email";

@Controller('email')
export class EmailController {
    constructor(private readonly mailerService: MailerService) { }

    @Post('send')
    @HttpCode(200)
    async sendEmail(@Body() body: any): Promise<void> {
        await sendEmail(this.mailerService, body.to, body.subject, body.text)
    }
}