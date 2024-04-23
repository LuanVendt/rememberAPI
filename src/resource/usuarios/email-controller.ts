import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Body, Controller, HttpCode, Post } from "@nestjs/common";

@Controller('email')
export class EmailController {
    constructor(private readonly mailerService: MailerService) { }

    @Post('send')
    @HttpCode(200)
    async sendEmail(@Body() body: any): Promise<void> {
        try {
            await this.mailerService.sendMail({
                to: body.to,
                subject: body.subject,
                text: body.text,
            })
        } catch (error) {
            throw new BadRequestException('Erro ao enviar o email: ' + error)
        }
    }
}