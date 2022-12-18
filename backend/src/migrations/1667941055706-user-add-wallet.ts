import {MigrationInterface, QueryRunner} from "typeorm";

export class userAddWallet1667941055706 implements MigrationInterface {
    name = 'userAddWallet1667941055706'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "REL_35472b1fe48b6330cd34970956"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "walletId" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_922e8c1d396025973ec81e2a402" UNIQUE ("walletId")`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_922e8c1d396025973ec81e2a402" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_922e8c1d396025973ec81e2a402"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_922e8c1d396025973ec81e2a402"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "walletId"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "REL_35472b1fe48b6330cd34970956" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
