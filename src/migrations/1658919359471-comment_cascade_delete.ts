import {MigrationInterface, QueryRunner} from "typeorm";

export class commentCascadeDelete1658919359471 implements MigrationInterface {
    name = 'commentCascadeDelete1658919359471'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
