import { url } from "node:inspector";
import { AppController } from "src/app.controller";
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUrlTable1616394791501 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(new Table({
            name: 'url',
            columns: [
                {
                    name: 'id',
                    type: 'bigint',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'url',
                    type: 'varchar',
                },
                {
                    name: 'short',
                    type: 'varchar',
                },
                {
                    name: 'expire',
                    type: 'timestamp'
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('url');
    }

}
