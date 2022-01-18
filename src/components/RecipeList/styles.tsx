import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin: 4rem auto 6rem;
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

    input {
        width: 90%;
        max-width: 45rem;
        margin-bottom: 1rem;
        position: relative;
        border-radius: 0.25rem;
        

        padding: 0 1.5rem;
        height: 3rem;

        border: 1px solid #d7d7d7;
        background-color: #e7e9ee;

        font-weight: 400;
        font-size: 1rem;


        &::placeholder {
            color: var(--text-body);
        }
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