import {MigrationInterface, QueryRunner} from "typeorm";

export class moviePerson1664803155521 implements MigrationInterface {
    name = 'moviePerson1664803155521'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."person_country_enum" AS ENUM('Россия', 'США', 'СССР', 'Франция', 'Италия', 'Испания', 'Великобритания', 'Германия', 'Южная Корея', 'Япония', 'Австралия', 'Австрия', 'Бельгия', 'Бразилия', 'Гонконг', 'Греция', 'Египет', 'Израиль', 'Индия', 'Канада', 'Китай', 'Лихтенштейн', 'Нидерланды', 'Норвегия', 'ОАЭ', 'Польша', 'Португалия', 'Таиланд', 'Турция', 'Украина', 'Филиппины', 'Швеция', 'Швейцария', 'ЮАР')`);
        await queryRunner.query(`CREATE TABLE "person" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "birthday" date NOT NULL, "country" "public"."person_country_enum" NOT NULL, "movieCount" integer, CONSTRAINT "PK_5fdaf670315c4b7e70cce85daa3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."movies_persons_type_enum" AS ENUM('АКТЕР', 'КОМПОЗИТОР', 'РЕЖИССЕР', 'ОПЕРАТОР', 'ПРОДЮСЕР', 'СЦЕНАРИСТ')`);
        await queryRunner.query(`CREATE TABLE "movies_persons" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "movieId" uuid NOT NULL, "personId" uuid NOT NULL, "type" "public"."movies_persons_type_enum" NOT NULL, CONSTRAINT "PK_6a65f90523676a3d164292d6896" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movies_persons" ADD CONSTRAINT "FK_d676d75df5003677ad3a55be31e" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "movies_persons" ADD CONSTRAINT "FK_8f529d02aae1c113a1309e86bda" FOREIGN KEY ("personId") REFERENCES "person"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movies_persons" DROP CONSTRAINT "FK_8f529d02aae1c113a1309e86bda"`);
        await queryRunner.query(`ALTER TABLE "movies_persons" DROP CONSTRAINT "FK_d676d75df5003677ad3a55be31e"`);
        await queryRunner.query(`DROP TABLE "movies_persons"`);
        await queryRunner.query(`DROP TYPE "public"."movies_persons_type_enum"`);
        await queryRunner.query(`DROP TABLE "person"`);
        await queryRunner.query(`DROP TYPE "public"."person_country_enum"`);
    }

}
