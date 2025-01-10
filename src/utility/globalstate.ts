import React from 'react';
import { createGlobalState } from 'react-hooks-global-state';

const initialState = { theme: InitTheme(),
                       language: InitLanguage()
                    };
const { useGlobalState } = createGlobalState(initialState);


function InitLanguage() {
    const theme = localStorage.getItem('language');
    if (theme != null) {
        return theme
    }
    return 'ln_english'
}

function InitTheme() {
    const theme = localStorage.getItem('theme');
    if (theme != null) {
        return theme
    }
    return 'light'
}

export {useGlobalState, InitTheme};