import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCodeToBarcodeScanner1686513534332 implements MigrationInterface {
    name = 'AddCodeToBarcodeScanner1686513534332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners"
            ADD "code" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners"
            ADD CONSTRAINT "UQ_9cd66822e2affd1945c1f334582" UNIQUE ("code")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners" DROP CONSTRAINT "UQ_9cd66822e2affd1945c1f334582"
        `);
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners" DROP COLUMN "code"
        `);
    }

}
