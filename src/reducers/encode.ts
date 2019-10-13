import { ENCODE_LIST_SUCCESS } from 'actions';
import { Encode } from 'models';

interface State {
  encodes: Encode[];
}

const initalState: State = {
  encodes: [],
};

const reducer = (state: State = initalState, action) => {
  switch (action.type) {
    case ENCODE_LIST_SUCCESS: return { ...state, encodes: action.encodes };
    default: return state;
  }
};

export default reducer;
