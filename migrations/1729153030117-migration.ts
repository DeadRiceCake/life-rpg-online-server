import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729153030117 implements MigrationInterface {
    name = 'Migration1729153030117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "heroes" DROP CONSTRAINT "FK_fa15099282a79050a70b80f54b4"`);
        await queryRunner.query(`CREATE TABLE "daily_todos" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL DEFAULT '', "display_order" integer NOT NULL, "isDone" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "hero_id" integer, CONSTRAINT "PK_90bca7d6b8c07c3ce8c6c596441" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deadline_todos" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL DEFAULT '', "display_order" integer NOT NULL, "isDone" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deadline" TIMESTAMP NOT NULL, "hero_id" integer, CONSTRAINT "PK_a464ee847c74e1d458c50a383a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weekly_todos" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL DEFAULT '', "display_order" integer NOT NULL, "isDone" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "days_to_repeat" text NOT NULL, "days_completed" text NOT NULL, "hero_id" integer, CONSTRAINT "PK_b55f3e72ba930deb739c32af660" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "physicalAttack"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "magicalAttack"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "physicalDefense"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "magicalDefense"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "physical_attack" integer NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "magical_attack" integer NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "physical_defense" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "magical_defense" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "max_daily_todo_reward" integer NOT NULL DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "max_weekly_todo_reward" integer NOT NULL DEFAULT '3'`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "job" SET DEFAULT 'citizen'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "level" SET DEFAULT '1'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "experience" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "max_hp" SET DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "current_hp" SET DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "max_mp" SET DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "current_mp" SET DEFAULT '100'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "strength" SET DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "intelligence" SET DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "dexterity" SET DEFAULT '10'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "dodge" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "critical" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "fatigue" SET DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "daily_todos" ADD CONSTRAINT "FK_8327a8c1eb3cd9b9b4e5fed8410" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deadline_todos" ADD CONSTRAINT "FK_176a9bac4f7c802157504010ae8" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD CONSTRAINT "FK_fa15099282a79050a70b80f54b4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weekly_todos" ADD CONSTRAINT "FK_28e4c8619af4c8b898404f2fd78" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weekly_todos" DROP CONSTRAINT "FK_28e4c8619af4c8b898404f2fd78"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP CONSTRAINT "FK_fa15099282a79050a70b80f54b4"`);
        await queryRunner.query(`ALTER TABLE "deadline_todos" DROP CONSTRAINT "FK_176a9bac4f7c802157504010ae8"`);
        await queryRunner.query(`ALTER TABLE "daily_todos" DROP CONSTRAINT "FK_8327a8c1eb3cd9b9b4e5fed8410"`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "fatigue" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "critical" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "dodge" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "dexterity" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "intelligence" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "strength" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "current_mp" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "max_mp" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "current_hp" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "max_hp" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "experience" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "level" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" ALTER COLUMN "job" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "max_weekly_todo_reward"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "max_daily_todo_reward"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "magical_defense"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "physical_defense"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "magical_attack"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "physical_attack"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "updatedAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "createdAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "magicalDefense" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "physicalDefense" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "magicalAttack" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "physicalAttack" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "weekly_todos"`);
        await queryRunner.query(`DROP TABLE "deadline_todos"`);
        await queryRunner.query(`DROP TABLE "daily_todos"`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD CONSTRAINT "FK_fa15099282a79050a70b80f54b4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
