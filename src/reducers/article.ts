import { VIDEO_ARTICLE_LIST_SUCCESS } from 'actions';
import { VideoArticle } from 'models';

interface State {
  articles: VideoArticle[];
}

const initalState: State = {
  articles: [],
}

const reducer = (state: State = initalState, action) => {
  switch(action.type) {
    case VIDEO_ARTICLE_LIST_SUCCESS: return { ...state, articles: action.articles };
    default: return state;
  }
}

export default reducer;