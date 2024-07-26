import { defineStore } from "pinia";
import { ref } from "vue";

export const useThemeStore = defineStore('themes', () => {
    const currentTheme = ref('')
    let isDarkMode = null

    const init = () => {
        const html = window.document.documentElement;
        currentTheme.value = localStorage.getItem("theme") || "system";
        localStorage.setItem("theme", currentTheme.value);
        isDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
        updateTheme(currentTheme.value);
        isDarkMode.addEventListener("change", ({ matches }) => {
            if (currentTheme.value === "system") {
                matches
                    ? html.classList.add("dark")
                    : html.classList.remove("dark");
            }
        });
    }

    const updateTheme = (theme) => {
        const html = window.document.documentElement;

        if (
            theme === "dark" ||
            (theme === "system" && isDarkMode.matches)
        ) {
            html.classList.add("dark");
        } else if (
            theme === "light" ||
            (theme === "system" && !isDarkMode.matches)
        ) {
            html.classList.remove("dark");
        }

        currentTheme.value = theme;
        localStorage.setItem("theme", theme);
    }

    return { currentTheme, init, updateTheme }
})
