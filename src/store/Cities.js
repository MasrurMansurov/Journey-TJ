import { create } from 'zustand'  

export const useCities = create((set) => ({
    isDarkMode: localStorage.getItem('theme') === 'true',
    handleChangeTheme: () => set((state) => {
        const newTheme = !state.isDarkMode;
        localStorage.setItem('theme', newTheme.toString());
        return { isDarkMode: newTheme };
    }),
}))