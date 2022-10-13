import {MigrationInterface, QueryRunner} from "typeorm";

export class userFavorites1665382071683 implements MigrationInterface {
    name = 'userFavorites1665382071683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "userFavoritesId" uuid`);
        await queryRunner.query(`ALTER TABLE "movie" ADD CONSTRAINT "FK_f98786ccb7c62dd9b18046d233d" FOREIGN KEY ("userFavoritesId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP CONSTRAINT "FK_f98786ccb7c62dd9b18046d233d"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "userFavoritesId"`);
    }

}
