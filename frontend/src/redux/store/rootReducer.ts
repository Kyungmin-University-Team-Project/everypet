import { combineReducers } from 'redux';
import categoryReducer from '../features/categorySlice';
import sidebarReducer from '../features/sidebarSlice';

// categoryReducer에서 관리하는 상태의 타입
type CategoryState = ReturnType<typeof categoryReducer>;

type SidebarState = ReturnType<typeof sidebarReducer>;

// 루트 리듀서에서 관리하는 전체 상태의 타입
export type RootState = {
  category: CategoryState;
  sidebar: SidebarState;
};

// 루트 리듀서 정의
const rootReducer = combineReducers({
  category: categoryReducer,
  sidebar: sidebarReducer,
});

export default rootReducer;
