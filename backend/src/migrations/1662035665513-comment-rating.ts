import {MigrationInterface, QueryRunner} from "typeorm";

export class commentRating1662035665513 implements MigrationInterface {
    name = 'commentRating1662035665513'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "username" TO "rating"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "rating" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "rating"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "rating" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" RENAME COLUMN "rating" TO "username"`);
    }

}
