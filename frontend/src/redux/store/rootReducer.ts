// src/redux/rootReducer.ts
import { combineReducers } from 'redux';
import categoryReducer from '../features/categorySlice';
import searchReducer from '../features/searchSlice';
import authReducer from '../auth/authSlice';  // Import the auth reducer

type CategoryState = ReturnType<typeof categoryReducer>;
type SearchState = ReturnType<typeof searchReducer>;
type AuthState = ReturnType<typeof authReducer>;  // Define the AuthState type

// 루트 리듀서에서 관리하는 전체 상태의 타입
export type RootState = {
  category: CategoryState;
  search: SearchState;
  auth: AuthState;  // Add auth state
};

// 루트 리듀서 정의
const rootReducer = combineReducers({
  category: categoryReducer,
  search: searchReducer,
  auth: authReducer,  // Add the auth reducer
});

export default rootReducer;
