import {MigrationInterface, QueryRunner} from "typeorm";

export class datesCreateUpdate1661981310069 implements MigrationInterface {
    name = 'datesCreateUpdate1661981310069'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_rated_to_movies_movie" ("userId" uuid NOT NULL, "movieId" uuid NOT NULL, CONSTRAINT "PK_a78eeb8ae96d1e097484dd37c4d" PRIMARY KEY ("userId", "movieId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_b9e5ea73c466d01f46d8012a7c" ON "user_rated_to_movies_movie" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cb9f3a5e67cc89a0865fb10bcc" ON "user_rated_to_movies_movie" ("movieId") `);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "comment" ADD "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "createdDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "updatedDate" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_rated_to_movies_movie" ADD CONSTRAINT "FK_b9e5ea73c466d01f46d8012a7c4" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_rated_to_movies_movie" ADD CONSTRAINT "FK_cb9f3a5e67cc89a0865fb10bcca" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_rated_to_movies_movie" DROP CONSTRAINT "FK_cb9f3a5e67cc89a0865fb10bcca"`);
        await queryRunner.query(`ALTER TABLE "user_rated_to_movies_movie" DROP CONSTRAINT "FK_b9e5ea73c466d01f46d8012a7c4"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP COLUMN "createdDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedDate"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdDate"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cb9f3a5e67cc89a0865fb10bcc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b9e5ea73c466d01f46d8012a7c"`);
        await queryRunner.query(`DROP TABLE "user_rated_to_movies_movie"`);
    }

}
