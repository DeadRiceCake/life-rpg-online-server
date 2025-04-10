import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Gender } from '../../appearance/types/gender.type';
import { DailyTodo } from '../../todo/entities/daily-todo.entity';
import { DeadlineTodo } from '../../todo/entities/deadline-todo.entity';
import { WeeklyTodo } from '../../todo/entities/weekly-todo.entity';
import { REWARD_STAT, RewardStat } from '../../todo/types/reward-stat.type';
import { User } from '../../user/entities/user.entity';
import { HERO_DEFAULT_EQUIPMENT } from '../constants/hero-default-equipment.contant';
import { HERO_DEFAULT_STAT } from '../constants/hero-default-stat.contant';
import { JOB, Job } from '../types/job.type';


@Entity('hero')
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id: string; // PK

  @Column({ length: 10 })
  name: string; // 영웅 이름

  @Column({ default: JOB.CITIZEN })
  job: Job; // 직업: "citizen" | "warrior" | "mage" | "theif"

  @Column({ default: 1 })
  level: number; // 레벨

  @Column({ default: 0 })
  experience: number; // 경험치

  @Column({ name: 'max_hp', default: 100 })
  maxHp: number; // 최대 체력

  @Column({ name: 'current_hp', default: 100 })
  currentHp: number; // 현재 체력

  @Column({ name: 'max_mp', default: 100 })
  maxMp: number; // 최대 마나

  @Column({ name: 'current_mp', default: 100 })
  currentMp: number; // 현재 마나
  
  @Column({ default: 10 })
  strength: number; // 힘 (물리 공격력, 체력 관여)
  
  @Column({ default: 10 })
  intelligence: number; // 지능 (마법 공격력, 마나 관여)
  
  @Column({ default: 10 })
  dexterity: number; // 민첩 (회피율, 치명타율 관여)

  @Column({ default: 0 })
  dodge: number; // 회피율

  @Column({ default: 0 })
  critical: number; // 치명타율
  
  @Column({ name: 'physical_attack', default: 10 })
  physicalAttack: number; // 물리 공격력

  @Column({ name: 'magical_attack', default: 10 })
  magicalAttack: number; // 마법 공격력

  @Column({ name: 'physical_defense', default: 0 })
  physicalDefense: number; // 물리 방어력

  @Column({ name: 'magical_defense', default: 0 })
  magicalDefense: number; // 마법 방어력

  @Column({ default: 0 })
  fatigue: number; // 피로도 (0 ~ 100) 0: 피로 없음, 100: 피로 최대 (피로도가 100이 되면 전투 불가)

  @Column({ name: 'max_daily_todo_reward', default: 10 })
  maxDailyTodoReward: number; // 일일 할 일 최대 보상

  @Column({ name: 'received_daily_todo_reward', default: 0 })
  receivedDailyTodoReward: number; // 일일 할 일 보상 획득 횟수

  @Column({ name: 'max_weekly_todo_reward', default: 3 })
  maxWeeklyTodoReward: number; // 주간 할 일 최대 보상

  @Column({ name: 'received_weekly_todo_reward', default: 0 })
  receivedWeeklyTodoReward: number; // 주간 할 일 보상 획득 횟수

  @Column()
  gender: Gender; // 성별 (남성, 여성)

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  // foreign key ======================================

  @Column({ name: 'user_id', unique: true })
  userId: string; // FK, 유저 ID

  @Column({ name: 'appearance_skin_id' })
  appearanceSkinId: string; // 외형 피부 ID

  @Column({ name: 'appearance_eye_id' })
  appearanceEyeId: string; // 외형 눈 ID

  @Column({ name: 'appearance_hair_id' })
  appearanceHairId: string; // 외형 머리 ID

  @Column({ name: 'appearance_beard_id' })
  appearanceBeardId: string; // 외형 수염 ID

  @Column({ name: 'equipment_helmet_id', nullable: true })
  equipmentHelmetId: string; // 장비 헬멧 ID

  @Column({ name: 'equipment_chest_id', nullable: true })
  equipmentChestId: string; // 장비 상의 ID

  @Column({ name: 'equipment_legs_id', nullable: true })
  equipmentLegsId: string; // 장비 하의 ID

  @Column({ name: 'equipment_shoulder_id', nullable: true })
  equipmentShoulderId: string; // 장비 어깨 ID

  @Column({ name: 'equipment_cloak_id', nullable: true })
  equipmentCloakId: string; // 장비 망토 ID

  @Column({ name: 'equipment_right_weapon_id', nullable: true })
  equipmentRightWeaponId: string; // 오른손 무기 ID

  @Column({ name: 'equipment_left_weapon_id', nullable: true })
  equipmentLeftWeaponId: string; // 왼손 무기 ID

  // relations ==============================================

  @OneToOne(() => User, (user) => user.hero, { onDelete: 'CASCADE', eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => DailyTodo, (dailyTodo) => dailyTodo.hero)
  dailyTodos: DailyTodo[];

  @OneToMany(() => WeeklyTodo, (weeklyTodo) => weeklyTodo.hero)
  weeklyTodos: WeeklyTodo[];

  @OneToMany(() => DeadlineTodo, (deadlineTodo) => deadlineTodo.hero)
  deadlineTodos: DeadlineTodo[];

  // methods ================================================

  static of(
    name: string, 
    userId: string, 
    appearance: {
      gender: Gender;
      skinId: string;
      eyeId: string;
      hairId: string;
      beardId: string;
    },
  ): Hero {
    const hero = new Hero();
    hero.userId = userId;
    hero.name = name;
    hero.job = JOB.CITIZEN;
    hero.level = HERO_DEFAULT_STAT.LEVEL;
    hero.experience = HERO_DEFAULT_STAT.EXPERIENCE;
    hero.maxHp = HERO_DEFAULT_STAT.MAX_HP;
    hero.currentHp = HERO_DEFAULT_STAT.CURRENT_HP;
    hero.maxMp = HERO_DEFAULT_STAT.MAX_MP;
    hero.currentMp = HERO_DEFAULT_STAT.CURRENT_MP;
    hero.strength = HERO_DEFAULT_STAT.STRENGTH;
    hero.intelligence = HERO_DEFAULT_STAT.INTELLIGENCE;
    hero.dexterity = HERO_DEFAULT_STAT.DEXTERITY;
    hero.dodge = HERO_DEFAULT_STAT.DODGE;
    hero.critical = HERO_DEFAULT_STAT.CRITICAL;
    hero.physicalAttack = HERO_DEFAULT_STAT.PHYSICAL_ATTACK;
    hero.magicalAttack = HERO_DEFAULT_STAT.MAGICAL_ATTACK;
    hero.physicalDefense = HERO_DEFAULT_STAT.PHYSICAL_DEFENSE;
    hero.magicalDefense = HERO_DEFAULT_STAT.MAGICAL_DEFENSE;
    hero.fatigue = HERO_DEFAULT_STAT.FATIGUE;
    hero.maxDailyTodoReward = HERO_DEFAULT_STAT.MAX_DAILY_TODO_REWARD;
    hero.receivedDailyTodoReward = HERO_DEFAULT_STAT.RECEIVED_DAILY_TODO_REWARD;
    hero.maxWeeklyTodoReward = HERO_DEFAULT_STAT.MAX_WEEKLY_TODO_REWARD;
    hero.receivedWeeklyTodoReward = HERO_DEFAULT_STAT.RECEIVED_WEEKLY_TODO_REWARD;
    hero.gender = appearance.gender
    hero.appearanceSkinId = appearance.skinId;
    hero.appearanceEyeId = appearance.eyeId;
    hero.appearanceHairId = appearance.hairId;
    hero.appearanceBeardId = appearance.beardId;
    hero.equipmentHelmetId = HERO_DEFAULT_EQUIPMENT.ARMOR.HELMET;
    hero.equipmentChestId = HERO_DEFAULT_EQUIPMENT.ARMOR.CHEST;
    hero.equipmentLegsId = HERO_DEFAULT_EQUIPMENT.ARMOR.LEGS;
    hero.equipmentShoulderId = HERO_DEFAULT_EQUIPMENT.ARMOR.SHOULDER;
    hero.equipmentRightWeaponId = HERO_DEFAULT_EQUIPMENT.WEAPON.RIGHT_HAND;
    return hero;
  }

  /**
   * 다음 레벨까지 필요한 경험치
   */
  experienceToNextLevel(): number {
    return this.level * 100;
  }

  /**
   * 경험치 획득
   * @param experience 획득 경험치
   */
  gainExperience(experience: number): void {
    this.experience += experience;

    if (this.experience >= this.experienceToNextLevel()) {
      const remainingExperience = this.experience - this.experienceToNextLevel();
      this.levelUp();
      this.gainExperience(remainingExperience);
    }
  }

  /**
   * 레벨 업
   */
  private levelUp(): void {
    this.level += 1;
    this.experience = 0;
    this.maxHp += 10;
    this.currentHp = this.maxHp;
    this.maxMp += 10;
    this.currentMp = this.maxMp;
    this.gainStrength();
    this.gainIntelligence();
    this.gainDexterity();
    this.fatigue = 0;

    this.gainMaxDailyTodoReward();
    this.gainMaxWeeklyTodoReward();
  }

  /**
   * 힘 증가
   */
  private gainStrength(): void {
    this.strength += 1;
    this.maxHp += 5;
    this.currentHp += 5;
    this.physicalAttack += 1;
  }

  /**
   * 지능 증가
   */
  private gainIntelligence(): void {
    this.intelligence += 1;
    this.maxMp += 5;
    this.currentMp += 5;
    this.magicalAttack += 1;
  }

  /**
   * 민첩 증가
   */
  private gainDexterity(): void {
    this.dexterity += 1;
    this.dodge += 1;
    this.critical += 1;
  }

  /**
   * 일일 할 일 보상 횟수 최대치 증가
   */
  private gainMaxDailyTodoReward(): void {
    if (this.level % 5 === 0) {
      this.maxDailyTodoReward += 1;
    }
  }

  /**
   * 주간 할 일 보상 횟수 최대치 증가
   */
  private gainMaxWeeklyTodoReward(): void {
    if (this.level % 10 === 0) {
      this.maxWeeklyTodoReward += 1;
    }
  }

  /**
   * 일일 할 일 완료
   */
  doneDailyTodo(rewardStat: RewardStat): void {
    if (this.receivedDailyTodoReward >= this.maxDailyTodoReward) {
      return;
    }

    this.gainStat(rewardStat);
    this.receivedDailyTodoReward += 1;
    this.gainExperience(5);
  }

  /**
   * 주간 할 일 완료
   */
  doneWeeklyTodo(rewardStat: RewardStat): void {
    if (this.receivedWeeklyTodoReward >= this.maxWeeklyTodoReward) {
      return;
    }

    this.gainStat(rewardStat, 3);
    this.receivedWeeklyTodoReward += 1;
    this.gainExperience(10);
  }

  private gainStat(rewardStat: RewardStat, amount = 1): void {
    for (let i = 0; i < amount; i++) {
      if (rewardStat === REWARD_STAT.STRENGTH) {
        this.gainStrength();
      } else if (rewardStat === REWARD_STAT.INTELLIGENCE) {
        this.gainIntelligence();
      } else if (rewardStat === REWARD_STAT.DEXTERITY) {
        this.gainDexterity();
      }
    }
  }
}
