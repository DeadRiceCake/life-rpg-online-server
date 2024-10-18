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
});
