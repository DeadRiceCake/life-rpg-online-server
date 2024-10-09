import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1728476425299 implements MigrationInterface {
    name = 'Migration1728476425299'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "post" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "password" character varying NOT NULL, "username" character varying(200) NOT NULL, "roles" text NOT NULL, "isAccountDisabled" boolean NOT NULL, "email" character varying(200) NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), CONSTRAINT "username" UNIQUE ("username"), CONSTRAINT "email" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "heroes" ("id" SERIAL NOT NULL, "name" character varying(10) NOT NULL, "job" character varying NOT NULL, "level" integer NOT NULL, "experience" integer NOT NULL, "max_hp" integer NOT NULL, "current_hp" integer NOT NULL, "max_mp" integer NOT NULL, "current_mp" integer NOT NULL, "strength" integer NOT NULL, "intelligence" integer NOT NULL, "dexterity" integer NOT NULL, "dodge" integer NOT NULL, "critical" integer NOT NULL, "physicalAttack" integer NOT NULL, "magicalAttack" integer NOT NULL, "physicalDefense" integer NOT NULL, "magicalDefense" integer NOT NULL, "fatigue" integer NOT NULL, "createdAt" TIMESTAMP DEFAULT now(), "updatedAt" TIMESTAMP DEFAULT now(), "user_id" integer, CONSTRAINT "REL_fa15099282a79050a70b80f54b" UNIQUE ("user_id"), CONSTRAINT "PK_9db096e6a3c6fe87c82c0af18fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD CONSTRAINT "FK_fa15099282a79050a70b80f54b4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "heroes" DROP CONSTRAINT "FK_fa15099282a79050a70b80f54b4"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`DROP TABLE "heroes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "articles"`);
    }

}
