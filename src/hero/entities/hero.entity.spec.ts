import { DailyTodo } from "../../todo/entities/daily-todo.entity";
import { WeeklyTodo } from "../../todo/entities/weekly-todo.entity";
import { DAY } from "../../todo/types/days.constant";
import { REWARD_STAT } from "../../todo/types/reward-stat.type";
import { TodoUtils } from "../../todo/utils/todo.util";
import { User } from "../../user/entities/user.entity";
import { Hero } from "./hero.entity";

describe('Hero Entity Unit Test', () => {
  describe('gainExperience', () => {
    it('경험치 증가 함수를 호출하면 파라미터 값만큼 경험치가 올라야함', () => {
      const hero = Hero.of('김첨지', new User());

      hero.gainExperience(50);

      expect(hero.experience).toBe(50);
    });

    it('경험치가 다음 레벨에 도달하면 레벨이 1 올라가고 초과된 경험치만큼 다음 레벨에 추가돼야함', () => {
      const hero = Hero.of('김첨지', new User());
      
      hero.gainExperience(120);

      const remainingExperience = 20;

      expect(hero.level).toBe(2);
      expect(hero.experience).toBe(remainingExperience);
    });

    it('경험치가 대량으로 들어왔을 때 레벨이 여러 번 올라가야함', () => {
      const hero = Hero.of('김첨지', new User());

      hero.gainExperience(350);

      const remainingExperience = 50;

      expect(hero.level).toBe(3);
      expect(hero.experience).toBe(remainingExperience);
    });
  });

  describe('doneDailyTodo', () => {
    it('일일 투두를 완료하면 영웅의 능력치가 증가해야함', () => {
      const hero = Hero.of('김첨지', new User());
      const dailyTodo = DailyTodo.of('테스트 끝내기', '끝내고 후딱 자자...', 0, REWARD_STAT.INTELLIGENCE);
      
      dailyTodo.hero = hero;
      hero.dailyTodos = [dailyTodo];
      
      hero.dailyTodos[0].done();

      expect(hero.strength).toBe(10);
      expect(hero.intelligence).toBe(10 + 1);
      expect(hero.dexterity).toBe(10);
      expect(hero.maxMp).toBe(100 + 5);
      expect(hero.currentMp).toBe(100 + 5);
      expect(hero.magicalAttack).toBe(10 + 1);
      expect(hero.experience).toBe(5);
    });
  });

  describe('doneWeeklyTodo', () => {
    it('주간 투두를 완료하면 영웅의 능력치가 증가해야함', () => {
      jest.spyOn(TodoUtils, 'getToday').mockReturnValue(DAY.MONDAY);
      
      const hero = Hero.of('김첨지', new User());
      const weeklyTodo = WeeklyTodo.of('테스트 끝내기', '끝내고 후딱 자자...', 0, [DAY.MONDAY], REWARD_STAT.INTELLIGENCE);

      weeklyTodo.hero = hero;
      hero.weeklyTodos = [weeklyTodo];

      hero.weeklyTodos[0].done(DAY.MONDAY);

      expect(hero.strength).toBe(10);
      expect(hero.intelligence).toBe(10 + 3);
      expect(hero.dexterity).toBe(10);
      expect(hero.maxMp).toBe(100 + 15);
      expect(hero.currentMp).toBe(100 + 15);
      expect(hero.magicalAttack).toBe(10 + 3);
      expect(hero.experience).toBe(10);
    });
  });
});
