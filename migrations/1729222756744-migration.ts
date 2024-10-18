import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1729222756744 implements MigrationInterface {
    name = 'Migration1729222756744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "deadline_todos" RENAME COLUMN "isDone" TO "is_done"`);
        await queryRunner.query(`ALTER TABLE "weekly_todos" RENAME COLUMN "isDone" TO "is_done"`);
        await queryRunner.query(`ALTER TABLE "daily_todos" RENAME COLUMN "isDone" TO "is_done"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "daily_todos" RENAME COLUMN "is_done" TO "isDone"`);
        await queryRunner.query(`ALTER TABLE "weekly_todos" RENAME COLUMN "is_done" TO "isDone"`);
        await queryRunner.query(`ALTER TABLE "deadline_todos" RENAME COLUMN "is_done" TO "isDone"`);
    }

}
