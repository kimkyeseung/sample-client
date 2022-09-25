import {
  READY,
  START_GAME,
  SET_NEXT_LEVEL,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  INITIALIZE_GAME
} from '../pages'

enum Type {
  READY,
  START_GAME,
  SET_NEXT_LEVEL,
  CORRECT_ANSWER,
  WRONG_ANSWER,
  INITIALIZE_GAME
}

export interface Action {
  delay?: number
  type: Type
}
