import {MigrationInterface, QueryRunner} from "typeorm";

export class UserMovie1658518887484 implements MigrationInterface {
    name = 'UserMovie1658518887484'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."movie_genre_enum" AS ENUM('action', 'comedy', 'drama', 'fantasy', 'horror', 'romance', 'thriller')`);
        await queryRunner.query(`CREATE TABLE "movie" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "genre" "public"."movie_genre_enum" NOT NULL, CONSTRAINT "PK_cb3bb4d61cf764dc035cbedd422" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_favorites_movie" ("userId" uuid NOT NULL, "movieId" uuid NOT NULL, CONSTRAINT "PK_1356e4bc2c044c0764f45e3b5b3" PRIMARY KEY ("userId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d27fbff6a666b33116507534d3" ON "user_favorites_movie" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_db072f8fa7b25761a181613c27" ON "user_favorites_movie" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "user_favorites_movie" ADD CONSTRAINT "FK_d27fbff6a666b33116507534d3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_favorites_movie" ADD CONSTRAINT "FK_db072f8fa7b25761a181613c27d" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_favorites_movie" DROP CONSTRAINT "FK_db072f8fa7b25761a181613c27d"`);
        await queryRunner.query(`ALTER TABLE "user_favorites_movie" DROP CONSTRAINT "FK_d27fbff6a666b33116507534d3b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_db072f8fa7b25761a181613c27"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d27fbff6a666b33116507534d3"`);
        await queryRunner.query(`DROP TABLE "user_favorites_movie"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TABLE "movie"`);
        await queryRunner.query(`DROP TYPE "public"."movie_genre_enum"`);
    }

}
