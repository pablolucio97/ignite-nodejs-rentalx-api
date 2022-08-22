import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCarImage1661108642922 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cars_image',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'car_id',
                    type: 'uuid',
                },
                {
                    name: 'image_name',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ], foreignKeys: [
                {
                    name: "FKCarImage", // name of your foreignKey
                    referencedTableName: 'cars', //origin table
                    referencedColumnNames: ['id'], //colum of the origin table
                    columnNames: ['car_id'], //colum of the destiny table
                    onUpdate: 'SET NULL', // reflects alters of origin to destiny table
                    onDelete: 'SET NULL', // reflects alters of origin to destiny table
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars_image')
    }

}
