import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729406579864 implements MigrationInterface {
    name = 'Migration1729406579864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "daily_todos" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL DEFAULT '', "display_order" integer NOT NULL, "is_done" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "hero_id" integer, CONSTRAINT "PK_90bca7d6b8c07c3ce8c6c596441" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "deadline_todos" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL DEFAULT '', "display_order" integer NOT NULL, "is_done" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "deadline" TIMESTAMP NOT NULL, "hero_id" integer, CONSTRAINT "PK_a464ee847c74e1d458c50a383a8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "post" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "password" character varying NOT NULL, "username" character varying(200) NOT NULL, "roles" text NOT NULL, "isAccountDisabled" boolean NOT NULL, "email" character varying(200) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), CONSTRAINT "username" UNIQUE ("username"), CONSTRAINT "email" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "heroes" ("id" SERIAL NOT NULL, "name" character varying(10) NOT NULL, "job" character varying NOT NULL DEFAULT 'citizen', "level" integer NOT NULL DEFAULT '1', "experience" integer NOT NULL DEFAULT '0', "max_hp" integer NOT NULL DEFAULT '100', "current_hp" integer NOT NULL DEFAULT '100', "max_mp" integer NOT NULL DEFAULT '100', "current_mp" integer NOT NULL DEFAULT '100', "strength" integer NOT NULL DEFAULT '10', "intelligence" integer NOT NULL DEFAULT '10', "dexterity" integer NOT NULL DEFAULT '10', "dodge" integer NOT NULL DEFAULT '0', "critical" integer NOT NULL DEFAULT '0', "physical_attack" integer NOT NULL DEFAULT '10', "magical_attack" integer NOT NULL DEFAULT '10', "physical_defense" integer NOT NULL DEFAULT '0', "magical_defense" integer NOT NULL DEFAULT '0', "fatigue" integer NOT NULL DEFAULT '0', "max_daily_todo_reward" integer NOT NULL DEFAULT '10', "received_daily_todo_reward" integer NOT NULL DEFAULT '0', "max_weekly_todo_reward" integer NOT NULL DEFAULT '3', "received_weekly_todo_reward" integer NOT NULL DEFAULT '0', "stat_points" integer NOT NULL DEFAULT '0', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "REL_fa15099282a79050a70b80f54b" UNIQUE ("user_id"), CONSTRAINT "PK_9db096e6a3c6fe87c82c0af18fc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "weekly_todos" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" character varying(255) NOT NULL DEFAULT '', "display_order" integer NOT NULL, "is_done" boolean NOT NULL DEFAULT false, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT now(), "days_to_repeat" text NOT NULL, "days_completed" text NOT NULL, "hero_id" integer, CONSTRAINT "PK_b55f3e72ba930deb739c32af660" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "daily_todos" ADD CONSTRAINT "FK_8327a8c1eb3cd9b9b4e5fed8410" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "deadline_todos" ADD CONSTRAINT "FK_176a9bac4f7c802157504010ae8" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD CONSTRAINT "FK_fa15099282a79050a70b80f54b4" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "weekly_todos" ADD CONSTRAINT "FK_28e4c8619af4c8b898404f2fd78" FOREIGN KEY ("hero_id") REFERENCES "heroes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "weekly_todos" DROP CONSTRAINT "FK_28e4c8619af4c8b898404f2fd78"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP CONSTRAINT "FK_fa15099282a79050a70b80f54b4"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`ALTER TABLE "deadline_todos" DROP CONSTRAINT "FK_176a9bac4f7c802157504010ae8"`);
        await queryRunner.query(`ALTER TABLE "daily_todos" DROP CONSTRAINT "FK_8327a8c1eb3cd9b9b4e5fed8410"`);
        await queryRunner.query(`DROP TABLE "weekly_todos"`);
        await queryRunner.query(`DROP TABLE "heroes"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "deadline_todos"`);
        await queryRunner.query(`DROP TABLE "daily_todos"`);
    }

}
