import styled from 'styled-components';

export const Container = styled.form`

    h2 {
        color: var(--text-title);
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 2rem;
    }

    input, select, textarea {
        width: 100%;
        padding: 0 1.5rem;
        height: 3rem;
        border-radius: 0.25rem;

        border: 1px solid #d7d7d7;
        background-color: #e7e9ee;

        font-weight: 400;
        font-size: 1rem;


        &::placeholder {
            color: var(--text-body);
        }
    }

    textarea {
        height: 10rem;
        padding: 1rem;
    }

    button[type=submit] {
        width: 100%;
        height: 3rem;
        border-radius: 0.25rem;
        background-color: var(--red);
        color: #ffffff;
        border: none;
        font-size: 1.2rem;
        font-weight: 600;
        margin-top: 1.5rem;

        transition: filter 0.2s;

        &:hover {
            filter: brightness(0.9);
        }
    }

    p {
        margin: 0.3rem auto 0 auto;
        text-align: center;
        padding: 0.8rem 0;
    }

    a {
        color: var(--red);
    }

    label {
        color: var(--text-body);
        font-size: 1rem;
        font-weight: 600;
        margin-bottom: 1.5rem;
    }
`;