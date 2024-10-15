import { Todo } from "../entities/base-todo.entity";
import { getLastDisplayOrder } from "./get-last-display-order.util";

describe('Todo Utils Test', () => {
  describe('getLastDisplayOrder', () => {
    it('todos가 빈 배열일 경우 0을 반환해야 함', () => {
      const todos: Todo[] = [];

      const result = getLastDisplayOrder(todos);

      expect(result).toBe(0);
    });

    it('todos가 비어있지 않은 경우 가장 큰 displayOrder를 반환해야 함', () => {
      const todos: Todo[] = [
        { displayOrder: 3 } as Todo,
        { displayOrder: 1 } as Todo,
        { displayOrder: 2 } as Todo,
        { displayOrder: 0 } as Todo,
      ];

      const result = getLastDisplayOrder(todos);

      expect(result).toBe(3);
    });
  });
});
