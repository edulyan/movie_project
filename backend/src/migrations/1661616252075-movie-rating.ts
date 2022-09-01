import {MigrationInterface, QueryRunner} from "typeorm";

export class movieRating1661616252075 implements MigrationInterface {
    name = 'movieRating1661616252075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" ADD "rating" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "rating"`);
    }

}
