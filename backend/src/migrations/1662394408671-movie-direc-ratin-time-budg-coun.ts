import {MigrationInterface, QueryRunner} from "typeorm";

export class movieDirecRatinTimeBudgCoun1662394408671 implements MigrationInterface {
    name = 'movieDirecRatinTimeBudgCoun1662394408671'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "director" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "ageRating" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "runTime" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "budget" integer NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."movie_country_enum" AS ENUM('Россия', 'США', 'СССР', 'Франция', 'Италия', 'Испания', 'Великобритания', 'Германия', 'Южная Корея', 'Япония', 'Австралия', 'Австрия', 'Бельгия', 'Бразилия', 'Гонконг', 'Греция', 'Египет', 'Израиль', 'Индия', 'Канада', 'Китай', 'Лихтенштейн', 'Нидерланды', 'Норвегия', 'ОАЭ', 'Польша', 'Португалия', 'Таиланд', 'Турция', 'Украина', 'Филиппины', 'Швеция', 'Швейцария', 'ЮАР')`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "country" "public"."movie_country_enum" array NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "country"`);
        await queryRunner.query(`DROP TYPE "public"."movie_country_enum"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "budget"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "runTime"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "ageRating"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "director"`);
    }

}
