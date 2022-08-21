import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

// this table is a table to store relationships

export class CreateSpecificationsCars1661081316074 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'specifications_cars',
            columns: [
                {
                    name: 'car_id',
                    type: 'uuid',
                },
                {
                    name: 'specification_id',
                    type: 'uuid',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
            ],
        })
        )

        await queryRunner.createForeignKey(
            "specifications_cars",
            new TableForeignKey({
                name: 'FKSpecificationCar',
                referencedTableName: 'specifications',
                referencedColumnNames: ['id'],
                columnNames: ['specification_id'],
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        )

        await queryRunner.createForeignKey(
            "specifications_cars", // the curret table name
            new TableForeignKey({
                name: 'FKCarSpecification', // the foreignTable name being created
                referencedTableName: 'cars', //origin table
                referencedColumnNames: ['id'], // origin table column to link
                columnNames: ['car_id'], // current table column to link to origin table
                onDelete: 'SET NULL',
                onUpdate: 'SET NULL',
            })
        )
    }

    //the revert process must happens from bottom to top
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('specifications_cars', 'FKSpecificationCar')

        await queryRunner.dropForeignKey('specifications_cars', 'FKCarSpecification')

        await queryRunner.dropTable('specifications_cars')
    }

}
