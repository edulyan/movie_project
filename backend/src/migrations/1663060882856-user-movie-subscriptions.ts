import {MigrationInterface, QueryRunner} from "typeorm";

export class userMovieSubscriptions1663060882856 implements MigrationInterface {
    name = 'userMovieSubscriptions1663060882856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "isSubscribed" boolean NOT NULL DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "withSubscription" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "withSubscription"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isSubscribed"`);
    }

}
