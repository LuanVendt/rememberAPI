import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException } from "@nestjs/common";

export async function sendEmail(
    mailerService: MailerService,
    to: string,
    subject: string,
    text: string
): Promise<void> {
    try {
        await mailerService.sendMail({
            to,
            subject,
            text,
        })
    } catch (error) {
        throw new BadRequestException('Erro ao enviar o email: ' + error)
    }
}