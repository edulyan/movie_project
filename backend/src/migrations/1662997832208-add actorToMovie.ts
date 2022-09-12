import {MigrationInterface, QueryRunner} from "typeorm";

export class addActorToMovie1662997832208 implements MigrationInterface {
    name = 'addActorToMovie1662997832208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "movieCount" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "actor" ALTER COLUMN "movieCount" SET NOT NULL`);
    }

}
