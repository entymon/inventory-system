import {MigrationInterface, QueryRunner} from "typeorm";

export class RemoveCountExecutionStatusTable1686517587236 implements MigrationInterface {
    name = 'RemoveCountExecutionStatusTable1686517587236'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "count_executions" DROP CONSTRAINT "FK_0e5c74728133f48a03b1f4c7002"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
                RENAME COLUMN "status_id" TO "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
                RENAME CONSTRAINT "REL_0e5c74728133f48a03b1f4c700" TO "UQ_6084814a84cfdc44cadffe889c7"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions" DROP CONSTRAINT "UQ_6084814a84cfdc44cadffe889c7"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
            ADD "status" character varying NOT NULL
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "count_executions" DROP COLUMN "status"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
            ADD "status" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
            ADD CONSTRAINT "UQ_6084814a84cfdc44cadffe889c7" UNIQUE ("status")
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
                RENAME CONSTRAINT "UQ_6084814a84cfdc44cadffe889c7" TO "REL_0e5c74728133f48a03b1f4c700"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
                RENAME COLUMN "status" TO "status_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
            ADD CONSTRAINT "FK_0e5c74728133f48a03b1f4c7002" FOREIGN KEY ("status_id") REFERENCES "count_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
