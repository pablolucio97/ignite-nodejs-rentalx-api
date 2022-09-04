import { container } from 'tsyringe'
import { IDateProvider } from './DateProvider/IDateProvider'
import { DateProvider } from './DateProvider/implementations/DayJSDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'
import { LocalStorageProvider } from './StorageProvider/implementations/LocalStorageProvider'
import { S3StorageProvider } from './StorageProvider/implementations/S3StorageProvider'
import { IStorageProvider } from './StorageProvider/IStorageProvider'

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DateProvider
)

container.registerInstance<IMailProvider>(
    "EtherealMailProvider",
    new EtherealMailProvider()
)

container.registerInstance<IStorageProvider>(
    "StorageProvider",
    new S3StorageProvider()
)