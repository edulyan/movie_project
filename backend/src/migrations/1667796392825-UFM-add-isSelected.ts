import {MigrationInterface, QueryRunner} from "typeorm";

export class UFMAddIsSelected1667796392825 implements MigrationInterface {
    name = 'UFMAddIsSelected1667796392825'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_fav_movies" ADD "isSelected" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_fav_movies" DROP COLUMN "isSelected"`);
    }

}
