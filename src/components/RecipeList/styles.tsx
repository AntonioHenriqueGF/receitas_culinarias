import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 2rem auto 0;
    padding: 2rem;
    border: 1px solid #bbb;
    border-radius: 0.5rem;
    width: 100%;
    max-width: 50rem;

    ul {
        width: 90%;
        max-width: 45rem;
        margin-bottom: 1rem;
        background-color: var(--background);
        position: relative;
        border-radius: 0.25rem;
        border: 1px solid #bbb;
        list-style: none;
    }
`

export const ListHeader = styled.div`
    display: flex;
    justify-content: space-between;
    width: 90%;
    max-width: 45rem;

    h2 {
        text-align: left;
        margin-bottom: 3rem;
        margin-top: 1rem;
        color: var(--text-title);
    }

    button {
        margin-bottom: 3rem;
        margin-top: 1rem;
    }
`;