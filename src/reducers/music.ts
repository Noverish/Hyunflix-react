import { MUSIC_LIST_SUCCESS } from 'actions';
import { Music } from 'models';

interface State {
  musics: Music[];
}

const initalState: State = {
  musics: [],
}

const reducer = (state: State = initalState, action) => {
  switch(action.type) {
    case MUSIC_LIST_SUCCESS:    return { ...state, musics: action.musics };
    default: return state;
  }
}

export default reducer;