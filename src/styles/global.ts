import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        --red: #fd4755;
        --blue: #5429cc;

        --blue-light: #6933ff;

        --text-title: #333;
        --text-body: #445;

        --text-light: #f0f2fb;

        --background: #f0f2f5;
        --shape: #ffffff;
    }

  * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        @media (max-width: 1080px) {
            font-size: 93.75%; 
        }

        @media (max-width: 720px) {
            font-size: 87.5%;
        }
    }


    body {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        background-color: var(--background);
        -webkit-font-smoothing: antialiased;
    }

    body, input, select, option, textarea, button {
        font-family: 'Poppins', sans-serif;
        font-weight: 400;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 600;
    }

    button {
        cursor: pointer;

        &:hover {
            filter: brightness(0.9);
        }
    }

    [disabled] {
        cursor: not-allowed;
        opacity: 0.6;
    }

    .react-modal-overlay {
        background-color: rgba(0, 0, 0, 0.5);

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        display: flex;
        align-items: center;
        justify-content: center;
    }

    .react-modal-content {
        width: 100%;
        max-width: 576px;
        background-color: var(--background);
        padding: 3rem;
        position: fixed;
        overflow: auto;
        border-radius: 0.25rem;
    }

    .react-signin-modal-content {
        width: 100%;
        max-width: 576px;
        height: 95%;
        background-color: var(--background);
        padding: 3rem;
        position: fixed;
        overflow: auto;
        border-radius: 0.25rem;
    }

    @media print {
        button {
            display: none;
        }
    }

    .react-recipe-modal-content {
        width: 100%;
        max-width: 70rem;
        height: 95%;
        background-color: var(--background);
        padding: 3rem;
        position: fixed;
        overflow: auto;
        border-radius: 0.25rem;

        @media print {
            position: static;
            height: fit-content;
            overflow: visible !important;
            padding: 0;
            max-width: none;
        }
    }

    .react-recipe-modal-overlay {
        background-color: rgba(0, 0, 0, 0.5);

        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        min-height: 550px;

        display: flex;
        align-items: center;
        justify-content: center;

        @media print {
            position: absolute;
            visibility: visible !important;
            overflow: visible !important;
            align-items: flex-start;
        }

    }

    .react-modal-close {
        position: absolute;
        right: 1.5rem;
        top: 1.5rem;
        border: none;
        background: transparent;

        transition: filter 0.2s;

        &:hover {
            cursor: pointer;
            filter: brightness(0.8);
        }
    }

    .createItemButton {
        background-color: var(--blue-light);
        color: var(--text-light);
        border: none;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
    }

    .updateItemButton {
        background-color: #ED8936;
        color: var(--text-light);
        border: none;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
    }

    .deleteItemButton {
        background-color: var(--red);
        color: var(--text-light);
        border: none;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
    }

    .refreshListButton {
        background-color: var(--text-light);
        color: #333;
        border: none;
        border-radius: 0.25rem;
        padding: 0.5rem 1rem;
        margin-right: 1rem;
    }

    .form-control {
        border: none;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 1rem 0;
    }
`