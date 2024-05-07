import { google } from "googleapis";
import credentials from "../../remember-api-dc284f041386.json";
import path from "path";
import { createReadStream, unlinkSync } from "fs";
import { randomUUID } from "crypto";
import { Injectable } from "@nestjs/common";

export interface IUploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    buffer: Buffer;
    filename: string;
}

export interface IUploadFilePort {
    uploadFile: (file: IUploadedFile) => Promise<string>;
}

@Injectable()
export class UploadFileAdapter implements IUploadFilePort {
    private scope: string[] = ["https://www.googleapis.com/auth/drive"];

    private async authenticate() {
        const jwt = new google.auth.JWT(
            credentials.client_email,
            undefined,
            credentials.private_key,
            this.scope
        );

        await jwt.authorize();

        return jwt;
    }

    async uploadFile(file: IUploadedFile): Promise<string> {
        try {
            const auth = await this.authenticate();

            const drive = google.drive({
                version: "v3",
                auth,
            });

            const currentDate = new Date().toISOString().split("T")[0];
            const uuid = randomUUID();

            const fileMetadata = {
                name: `${currentDate}${uuid}${file.originalname}`,
                parents: ["1SwhMFvn2cgEUdhZ9vq_f_At4aJUp9NUu"],
            };

            const filePath = path.join(
                `src/uploads/${file.filename}` 
            );

            const media = {
                body: createReadStream(filePath),
                mimeType: file.mimetype,
            };

            const uploadedFile = await drive.files.create({
                requestBody: fileMetadata,
                media,
                fields: "id",
            });

            const fileUrl = `https://drive.google.com/thumbnail?id=${uploadedFile.data.id}`;

            unlinkSync(filePath);

            return fileUrl;
        } catch (error: any) {
            throw new Error(error);
        }
    }
}