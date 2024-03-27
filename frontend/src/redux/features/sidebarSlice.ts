import { createSlice } from '@reduxjs/toolkit';

interface SidebarState {
  isOpen: boolean;
}

const initialState: SidebarState = {
  isOpen: false, // 사이드바의 초기 상태는 닫힌 상태로 설정합니다.
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar(state) {
      state.isOpen = !state.isOpen; // 토글하여 현재 상태의 반대로 변경합니다.
    },
    openSidebar(state) {
      state.isOpen = true; // 사이드바를 열린 상태로 설정합니다.
    },
    closeSidebar(state) {
      state.isOpen = false; // 사이드바를 닫힌 상태로 설정합니다.
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } =
  sidebarSlice.actions;
export default sidebarSlice.reducer;
