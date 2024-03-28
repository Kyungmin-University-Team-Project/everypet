import { combineReducers } from 'redux';
import categoryReducer from '../features/categorySlice';

// categoryReducer에서 관리하는 상태의 타입
type CategoryState = ReturnType<typeof categoryReducer>;

// 루트 리듀서에서 관리하는 전체 상태의 타입
export type RootState = {
  category: CategoryState;
};

// 루트 리듀서 정의
const rootReducer = combineReducers({
  category: categoryReducer,
});

export default rootReducer;
