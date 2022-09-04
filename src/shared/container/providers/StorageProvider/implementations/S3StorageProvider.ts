import { IStorageProvider } from "../IStorageProvider";
import { S3 } from 'aws-sdk'
import { resolve } from 'path'
import fs from 'fs'
import upload from "@config/upload";
import mime from 'mime'

class S3StorageProvider implements IStorageProvider {

    private client: S3

    constructor() {
        this.client = new S3({
            region: process.env.AWS_BUCKET_REGION
        })
    }

    async save(file: string, folder: string): Promise<string> {

        //reads file content
        const originalName = resolve(upload.tmpFolder, file)
        // add the file to S3 bucket
        const fileContent = await fs.promises.readFile(originalName)
        // allow to get the content type of a file
        const ContentType = mime.getType(originalName);

        await this.client.putObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
            ACL: 'public-read',
            Body: fileContent,
            //content type is required for avoiding an automatic download and 
            //allow to see the file
            ContentType,
        }).promise()

        //removes the content from a folder
        await fs.promises.unlink(originalName)
        return file
    }

    async delete(file: string, folder: string): Promise<void> {
        await this.client.deleteObject({
            Bucket: `${process.env.AWS_BUCKET}/${folder}`,
            Key: file,
        }).promise()
    }

}

export { S3StorageProvider }