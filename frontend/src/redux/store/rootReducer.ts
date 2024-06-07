import { combineReducers } from 'redux';
import categoryReducer from '../features/categorySlice';
import searchReducer from '../features/searchSlice';

type CategoryState = ReturnType<typeof categoryReducer>;
type SearchState = ReturnType<typeof searchReducer>;

// 루트 리듀서에서 관리하는 전체 상태의 타입
export type RootState = {
  category: CategoryState;
  search: SearchState;
};

// 루트 리듀서 정의
const rootReducer = combineReducers({
  category: categoryReducer,
  search: searchReducer,
});

export default rootReducer;
