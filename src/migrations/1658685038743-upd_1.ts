import {MigrationInterface, QueryRunner} from "typeorm";

export class upd11658685038743 implements MigrationInterface {
    name = 'upd11658685038743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "comment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "username" character varying NOT NULL, "text" character varying NOT NULL, "movieId" uuid, "userId" uuid, CONSTRAINT "PK_0b0e4bbc8415ec426f87f3a88e2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "image" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "movie" ADD "video" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_aea4918c888422550a85e257894" FOREIGN KEY ("movieId") REFERENCES "movie"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_c0354a9a009d3bb45a08655ce3b"`);
        await queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_aea4918c888422550a85e257894"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "video"`);
        await queryRunner.query(`ALTER TABLE "movie" DROP COLUMN "image"`);
        await queryRunner.query(`DROP TABLE "comment"`);
    }

}
