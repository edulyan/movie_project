import {MigrationInterface, QueryRunner} from "typeorm";

export class updAllApp1673814548586 implements MigrationInterface {
    name = 'updAllApp1673814548586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."plan_type_enum" AS ENUM('1 минута', '30 дней', '180 дней', '360 дней')`);
        await queryRunner.query(`CREATE TABLE "plan" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."plan_type_enum" NOT NULL, "price" integer NOT NULL, CONSTRAINT "PK_54a2b686aed3b637654bf7ddbb3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD "next_payment_date" TIMESTAMP WITH TIME ZONE`);
        await queryRunner.query(`ALTER TYPE "public"."movie_genre_enum" RENAME TO "movie_genre_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."movie_genre_enum" AS ENUM('боевик', 'комедия', 'драма', 'фэнтэзи', 'ужасы', 'мелодрама', 'триллер', 'фантастика', 'вестерн', 'детектив')`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "genre" TYPE "public"."movie_genre_enum"[] USING "genre"::"text"::"public"."movie_genre_enum"[]`);
        await queryRunner.query(`DROP TYPE "public"."movie_genre_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."movie_genre_enum_old" AS ENUM('боевик', 'комедия', 'драма', 'фэнтэзи', 'ужасы', 'мелодрама', 'триллер', 'фантастика')`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "genre" TYPE "public"."movie_genre_enum_old"[] USING "genre"::"text"::"public"."movie_genre_enum_old"[]`);
        await queryRunner.query(`DROP TYPE "public"."movie_genre_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."movie_genre_enum_old" RENAME TO "movie_genre_enum"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "next_payment_date"`);
        await queryRunner.query(`DROP TABLE "plan"`);
        await queryRunner.query(`DROP TYPE "public"."plan_type_enum"`);
    }

}
