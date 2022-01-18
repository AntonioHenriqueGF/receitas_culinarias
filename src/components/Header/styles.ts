import styled from 'styled-components';

export const Container = styled.header`
    background: var(--blue);
`;

export const Content = styled.div`
    max-width: 1120px;
    margin: 0 auto;

    padding: 2rem 1rem 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1>button {
        color: var(--text-light);
        display: flex;
        align-items: center;
        font-size: 2rem;
        font-weight: 700;

        img {
            margin-right: 1rem;
            width: 5rem;
        }

        strong {
            /* color: #fd4755; */
            color: var(--red);
            /* font-size: 2rem; */
        }
    }

    ul {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    li { 
        display: flex;
        align-items: center;
        justify-content: center;
        list-style: none;
        margin: 0 0.2rem;
        font-size: 1rem;
        font-weight: 600;
        color: var(--text-title);
        transition: color 0.2s;
        padding: 0.2rem 0.8rem;
    }

    li:hover {
        background: #f0f2fb20;
        border-bottom: .1rem solid var(--text-body);
        border-top: .1rem solid #00000000;

        button {
            color: var(--red);
        }
    }

    a, p, button { 
        color: var(--text-light);
        text-decoration: none;
    }
    
    p {
        margin-right: 1rem;
    }

    button { 
        background: none;
        border: none;
        font-size: 1.2rem;
        font-weight: 600;
        transition: color 0.2s;
        padding: 0.4rem 0.8rem;
    }
`;