import {MigrationInterface, QueryRunner} from "typeorm";

export class movieAverageRating1662030889046 implements MigrationInterface {
    name = 'movieAverageRating1662030889046'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" RENAME COLUMN "rating" TO "averageRating"`);
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "averageRating" SET DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ALTER COLUMN "averageRating" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "movie" RENAME COLUMN "averageRating" TO "rating"`);
    }

}
