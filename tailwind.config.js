import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors:{
                transparent: 'transparent',
                current: 'currentColor',
                'error':'#EB5528',
                'success':'#8CB242',
                'warning':'#F5BF59',
                'BGray': {
                    100: '#c8dfe3',
                    200: '#91c0c8',
                    300: '#5ba0ac',
                    500: '#258090',
                    600: '#1e6470',
                },
                'BGreen':{
                    200: '#f9f0eb',
                    300: '#f1e0d7',
                    400: '#e9d2c2',
                    500: '#e2c3ae',
                    600: '#ae9787',
                },
                'BRuby':{
                    200: '#edf6f6',
                    300: '#ddebed',
                    400: '#cde3e3',
                    500: '#bbd9db',
                    600: '#91a7a9',
                },
                'BBrown':{
                    200: '#fedbd8',
                    300: '#fdb7b0',
                    400: '#fc9389',
                    500: '#fb6f61',
                    600: '#c1584d',
                }
            }
        },
    },

    plugins: [forms],
};
