import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { UploadCarImagesUseCase } from './UploadCarImagesUseCase'

interface IFiles {
    fileName: string;
}

class UploadCarImagesController {
    async handle(req: Request, res: Response) {
        const { id } = req.params
        const images = req.files as unknown as IFiles[]

        const uploadCarImageUseCase = container.resolve(UploadCarImagesUseCase)
        const images_name = images.map(file => file.fileName)
        await uploadCarImageUseCase.execute({
            car_id: id,
            images_name
        })

        return res.status(201).send()
    }
}

export { UploadCarImagesController }