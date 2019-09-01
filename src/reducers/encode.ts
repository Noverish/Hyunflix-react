import { ENCODE_LIST_SUCCESS } from 'actions';
import { Encode } from 'models';

interface EncodeReducerState {
  encodes: Encode[];
}

const initalState: EncodeReducerState = {
  encodes: [],
}

const reducer = (state = initalState, action) => {
  switch(action.type) {
    case ENCODE_LIST_SUCCESS: return { ...state, encodes: action.encodes };
    default: return state;
  }
}

export default reducer;
