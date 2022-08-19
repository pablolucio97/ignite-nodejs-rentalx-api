import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCars1660904212305 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cars',
            columns: [
                {
                    name: 'id',
                    type: 'uuid',
                    isPrimary: true
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'description',
                    type: 'varchar',
                },
                {
                    name: 'daily_rate',
                    type: 'numeric',
                },
                {
                    name: 'available',
                    type: 'boolean',
                    default: true
                },
                {
                    name: 'license_plate',
                    type: 'varchar',
                },
                {
                    name: 'fine_amount',
                    type: 'numeric',
                },
                {
                    name: 'brand',
                    type: 'varchar',
                },
                {
                    name: 'category_id',
                    type: 'uuid',
                    isNullable: true
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ], foreignKeys:[
                {
                    name: "FKCategoryCar", // name of your foreignKey
                    referencedTableName: 'categories', //origin table
                    referencedColumnNames: ['id'], //colum of the origin table
                    columnNames: ['category_id'], //colum of the destiny table
                    onUpdate: 'SET NULL', // reflects alters of origin to destiny table
                    onDelete: 'SET NULL', // reflects alters of origin to destiny table
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cars')
    }

}
