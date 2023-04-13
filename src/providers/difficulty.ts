import { ref } from "vue";

export type DifficultyLevel = 1 | 2 | 3 | 4

class Difficulty {
  public readonly level = ref<DifficultyLevel>(1)

  public load() {
    // TODO Implement me
  }

  public store() {
    // TODO Implement me
  }
}

const difficulty = new Difficulty()

export const useDifficulty = () => difficulty
