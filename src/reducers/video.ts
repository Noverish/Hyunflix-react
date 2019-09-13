import { VIDEO_ARTICLE_LIST_SUCCESS, VIDEO_ARTICLE_CONTENT_SUCCESS } from 'actions';
import { VideoArticle, Subtitle } from 'models';

interface State {
  articles: VideoArticle[];
  article: VideoArticle | null;
  subtitles: Subtitle[];
}

const initalState: State = {
  articles: [],
  article: null,
  subtitles: [],
}

const reducer = (state: State = initalState, action) => {
  switch(action.type) {
    case VIDEO_ARTICLE_LIST_SUCCESS:    return { ...state, articles: action.articles };
    case VIDEO_ARTICLE_CONTENT_SUCCESS: return { ...state, article: action.article, subtitles: action.subtitles };
    default: return state;
  }
}

export default reducer;