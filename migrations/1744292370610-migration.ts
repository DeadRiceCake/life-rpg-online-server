import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1744292370610 implements MigrationInterface {
    name = 'Migration1744292370610'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_helmet_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_chest_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_legs_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_shoulder_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_cloak_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_right_weapon_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_left_weapon_id" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_left_weapon_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_right_weapon_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_cloak_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_shoulder_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_legs_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_chest_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "hero" ALTER COLUMN "equipment_helmet_id" SET NOT NULL`);
    }

}
