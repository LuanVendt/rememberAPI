// import { MailerService } from "@nestjs-modules/mailer";
// import { Body, Controller, Post } from "@nestjs/common";

// @Controller('email')
// export class EmailController {
//     constructor(private readonly mailerService: MailerService) { }

//     @Post('send')
//     async sendEmail(@Body() body: any): Promise<string> {
//         try {
//             await this.mailerService.sendMail({
//                 to: body.to,
//                 subject: body.subject,
//                 text: body.text,
//             })

//             return 'E-mail enviado com sucesso!'
//         } catch (error) {
//             return 'Erro ao enviar o email: ' + error
//         }
//     }
// }