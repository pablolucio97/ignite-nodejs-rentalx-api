import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateRentals1661162337999 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rentals',
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "car_id",
                        type: "uuid",
                    },
                    {
                        name: "start_date",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "end_date",
                        type: "timestamp",
                        isNullable: true,
                    },
                    {
                        name: "expect_return_date",
                        type: "timestamp",
                    },
                    {
                        name: "total",
                        type: "numeric",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ], foreignKeys: [
                    {
                        name: "FKCarRental", // name of your foreignKey
                        referencedTableName: 'cars', //origin table
                        referencedColumnNames: ['id'], //colum of the origin table
                        columnNames: ['car_id'], //colum of the destiny table
                        onUpdate: 'SET NULL', // reflects alters of origin to destiny table
                        onDelete: 'SET NULL', // reflects alters of origin to destiny table
                    },
                    {
                        name: "FKUserRental", // name of your foreignKey
                        referencedTableName: 'users', //origin table
                        referencedColumnNames: ['id'], //colum of the origin table
                        columnNames: ['user_id'], //colum of the destiny table
                        onUpdate: 'SET NULL', // reflects alters of origin to destiny table
                        onDelete: 'SET NULL', // reflects alters of origin to destiny table
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('rentals')
    }

}
