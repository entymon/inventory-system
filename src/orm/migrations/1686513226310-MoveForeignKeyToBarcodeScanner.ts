import {MigrationInterface, QueryRunner} from "typeorm";

export class MoveForeignKeyToBarcodeScanner1686513226310 implements MigrationInterface {
    name = 'MoveForeignKeyToBarcodeScanner1686513226310'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_b2234b15442d33b41e52b02fcc4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_b2234b15442d33b41e52b02fcc4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "scanner_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners"
            ADD "user_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners"
            ADD CONSTRAINT "UQ_d15518ca1fba35f64e0f1ace44a" UNIQUE ("user_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners"
            ADD CONSTRAINT "FK_d15518ca1fba35f64e0f1ace44a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners" DROP CONSTRAINT "FK_d15518ca1fba35f64e0f1ace44a"
        `);
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners" DROP CONSTRAINT "UQ_d15518ca1fba35f64e0f1ace44a"
        `);
        await queryRunner.query(`
            ALTER TABLE "barcode_scanners" DROP COLUMN "user_id"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "scanner_id" integer
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_b2234b15442d33b41e52b02fcc4" UNIQUE ("scanner_id")
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_b2234b15442d33b41e52b02fcc4" FOREIGN KEY ("scanner_id") REFERENCES "barcode_scanners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

}
