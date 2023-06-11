import {MigrationInterface, QueryRunner} from "typeorm";

export class AddNewEntities1686482891874 implements MigrationInterface {
    name = 'AddNewEntities1686482891874'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "products" (
                "id" SERIAL NOT NULL,
                "price" integer NOT NULL,
                "category" character varying NOT NULL,
                CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "subProducts" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                "total" integer NOT NULL,
                "product_id" integer,
                CONSTRAINT "PK_00acc9b09eadcea05c6c12c2d3c" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "barcodes" (
                "id" SERIAL NOT NULL,
                "code" character varying NOT NULL,
                "subproduct_id" integer,
                CONSTRAINT "PK_96abb033220d041003ad937f587" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "repetition_schedules" (
                "id" SERIAL NOT NULL,
                "next_count" TIMESTAMP NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "count_plan_id" integer,
                CONSTRAINT "PK_d018dcfe9f9c89f35e4060e57b2" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "barcode_scanners" (
                "id" SERIAL NOT NULL,
                CONSTRAINT "PK_1f1a2c760b293986ec7085ab370" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "count_plans" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "owner_id" integer,
                CONSTRAINT "PK_98e253cfa26d00fc8c0acb41574" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "count_statuses" (
                "id" SERIAL NOT NULL,
                "name" character varying NOT NULL,
                CONSTRAINT "UQ_78cb373bc0ac8d2cfcb48fba892" UNIQUE ("name"),
                CONSTRAINT "PK_1d75bf9eb0b96c101978345dfb9" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "count_executions" (
                "id" SERIAL NOT NULL,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                "count_plan_id" integer,
                "status_id" integer,
                CONSTRAINT "REL_0e5c74728133f48a03b1f4c700" UNIQUE ("status_id"),
                CONSTRAINT "PK_dd7de1c0f7b33e7534934b897d0" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "user_roles" (
                "id" SERIAL NOT NULL,
                "role" character varying NOT NULL,
                CONSTRAINT "UQ_0475850442d60bd704c58041551" UNIQUE ("role"),
                CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users_count_plans_assigned_count_plans" (
                "users_id" integer NOT NULL,
                "count_plans_id" integer NOT NULL,
                CONSTRAINT "PK_235502df4e37fda54104298fc53" PRIMARY KEY ("users_id", "count_plans_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_28c2dc33f0254014ea960fce4d" ON "users_count_plans_assigned_count_plans" ("users_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_901e60b5db8b14dd80517da928" ON "users_count_plans_assigned_count_plans" ("count_plans_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "users_count_executions_count_executions" (
                "users_id" integer NOT NULL,
                "count_executions_id" integer NOT NULL,
                CONSTRAINT "PK_48b4539ba9aecb49a5563f16e3e" PRIMARY KEY ("users_id", "count_executions_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_cae0144ad74b5e48828c5e4b97" ON "users_count_executions_count_executions" ("users_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_2d2b3a2bba8c59e172eb2035cc" ON "users_count_executions_count_executions" ("count_executions_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "count_plans_assignees_users" (
                "count_plans_id" integer NOT NULL,
                "users_id" integer NOT NULL,
                CONSTRAINT "PK_f3bbc74b7b234f827a710722f41" PRIMARY KEY ("count_plans_id", "users_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_66c3511b04ba5cf03d9cf3ff22" ON "count_plans_assignees_users" ("count_plans_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_39452a54916ee0daeac2521f00" ON "count_plans_assignees_users" ("users_id")
        `);
        await queryRunner.query(`
            CREATE TABLE "count_executions_users_users" (
                "count_executions_id" integer NOT NULL,
                "users_id" integer NOT NULL,
                CONSTRAINT "PK_65d7fee80f7346b9036ec4eb278" PRIMARY KEY ("count_executions_id", "users_id")
            )
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_1e23890e2a729908de98588682" ON "count_executions_users_users" ("count_executions_id")
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_91bcefc2fa4fd3df5fa7a62510" ON "count_executions_users_users" ("users_id")
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
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "subProducts"
            ADD CONSTRAINT "FK_ddcbe93685a30735c3be5b39f82" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "barcodes"
            ADD CONSTRAINT "FK_8ce5796461f381c59b0d11ee2d8" FOREIGN KEY ("subproduct_id") REFERENCES "subProducts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "repetition_schedules"
            ADD CONSTRAINT "FK_004ab5dd25108407297396bc39f" FOREIGN KEY ("count_plan_id") REFERENCES "count_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "FK_b2234b15442d33b41e52b02fcc4" FOREIGN KEY ("scanner_id") REFERENCES "barcode_scanners"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "count_plans"
            ADD CONSTRAINT "FK_5dec11959824bfd4ac4cc49fbc8" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
            ADD CONSTRAINT "FK_1b3ef581cb644d4a61b3bd27c61" FOREIGN KEY ("count_plan_id") REFERENCES "count_plans"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions"
            ADD CONSTRAINT "FK_0e5c74728133f48a03b1f4c7002" FOREIGN KEY ("status_id") REFERENCES "count_statuses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
        await queryRunner.query(`
            ALTER TABLE "users_count_plans_assigned_count_plans"
            ADD CONSTRAINT "FK_28c2dc33f0254014ea960fce4d5" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "users_count_plans_assigned_count_plans"
            ADD CONSTRAINT "FK_901e60b5db8b14dd80517da9288" FOREIGN KEY ("count_plans_id") REFERENCES "count_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "users_count_executions_count_executions"
            ADD CONSTRAINT "FK_cae0144ad74b5e48828c5e4b974" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "users_count_executions_count_executions"
            ADD CONSTRAINT "FK_2d2b3a2bba8c59e172eb2035ccb" FOREIGN KEY ("count_executions_id") REFERENCES "count_executions"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "count_plans_assignees_users"
            ADD CONSTRAINT "FK_66c3511b04ba5cf03d9cf3ff22c" FOREIGN KEY ("count_plans_id") REFERENCES "count_plans"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "count_plans_assignees_users"
            ADD CONSTRAINT "FK_39452a54916ee0daeac2521f00f" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions_users_users"
            ADD CONSTRAINT "FK_1e23890e2a729908de985886828" FOREIGN KEY ("count_executions_id") REFERENCES "count_executions"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions_users_users"
            ADD CONSTRAINT "FK_91bcefc2fa4fd3df5fa7a62510e" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "count_executions_users_users" DROP CONSTRAINT "FK_91bcefc2fa4fd3df5fa7a62510e"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions_users_users" DROP CONSTRAINT "FK_1e23890e2a729908de985886828"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_plans_assignees_users" DROP CONSTRAINT "FK_39452a54916ee0daeac2521f00f"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_plans_assignees_users" DROP CONSTRAINT "FK_66c3511b04ba5cf03d9cf3ff22c"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_count_executions_count_executions" DROP CONSTRAINT "FK_2d2b3a2bba8c59e172eb2035ccb"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_count_executions_count_executions" DROP CONSTRAINT "FK_cae0144ad74b5e48828c5e4b974"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_count_plans_assigned_count_plans" DROP CONSTRAINT "FK_901e60b5db8b14dd80517da9288"
        `);
        await queryRunner.query(`
            ALTER TABLE "users_count_plans_assigned_count_plans" DROP CONSTRAINT "FK_28c2dc33f0254014ea960fce4d5"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions" DROP CONSTRAINT "FK_0e5c74728133f48a03b1f4c7002"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_executions" DROP CONSTRAINT "FK_1b3ef581cb644d4a61b3bd27c61"
        `);
        await queryRunner.query(`
            ALTER TABLE "count_plans" DROP CONSTRAINT "FK_5dec11959824bfd4ac4cc49fbc8"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "FK_b2234b15442d33b41e52b02fcc4"
        `);
        await queryRunner.query(`
            ALTER TABLE "repetition_schedules" DROP CONSTRAINT "FK_004ab5dd25108407297396bc39f"
        `);
        await queryRunner.query(`
            ALTER TABLE "barcodes" DROP CONSTRAINT "FK_8ce5796461f381c59b0d11ee2d8"
        `);
        await queryRunner.query(`
            ALTER TABLE "subProducts" DROP CONSTRAINT "FK_ddcbe93685a30735c3be5b39f82"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "name"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "name" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "username"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "username" character varying(40)
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "email"
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD "email" character varying(100) NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "users"
            ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email")
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP CONSTRAINT "UQ_b2234b15442d33b41e52b02fcc4"
        `);
        await queryRunner.query(`
            ALTER TABLE "users" DROP COLUMN "scanner_id"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_91bcefc2fa4fd3df5fa7a62510"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_1e23890e2a729908de98588682"
        `);
        await queryRunner.query(`
            DROP TABLE "count_executions_users_users"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_39452a54916ee0daeac2521f00"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_66c3511b04ba5cf03d9cf3ff22"
        `);
        await queryRunner.query(`
            DROP TABLE "count_plans_assignees_users"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_2d2b3a2bba8c59e172eb2035cc"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_cae0144ad74b5e48828c5e4b97"
        `);
        await queryRunner.query(`
            DROP TABLE "users_count_executions_count_executions"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_901e60b5db8b14dd80517da928"
        `);
        await queryRunner.query(`
            DROP INDEX "public"."IDX_28c2dc33f0254014ea960fce4d"
        `);
        await queryRunner.query(`
            DROP TABLE "users_count_plans_assigned_count_plans"
        `);
        await queryRunner.query(`
            DROP TABLE "user_roles"
        `);
        await queryRunner.query(`
            DROP TABLE "count_executions"
        `);
        await queryRunner.query(`
            DROP TABLE "count_statuses"
        `);
        await queryRunner.query(`
            DROP TABLE "count_plans"
        `);
        await queryRunner.query(`
            DROP TABLE "barcode_scanners"
        `);
        await queryRunner.query(`
            DROP TABLE "repetition_schedules"
        `);
        await queryRunner.query(`
            DROP TABLE "barcodes"
        `);
        await queryRunner.query(`
            DROP TABLE "subProducts"
        `);
        await queryRunner.query(`
            DROP TABLE "products"
        `);
    }

}
