import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729165859503 implements MigrationInterface {
    name = 'Migration1729165859503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "heroes" ADD "received_daily_todo_reward" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "received_weekly_todo_reward" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "heroes" ADD "stat_points" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "stat_points"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "received_weekly_todo_reward"`);
        await queryRunner.query(`ALTER TABLE "heroes" DROP COLUMN "received_daily_todo_reward"`);
    }

}
