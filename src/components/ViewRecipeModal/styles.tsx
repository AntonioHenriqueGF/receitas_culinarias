import styled from 'styled-components';

export const Container = styled.div`
    
    margin: 4rem;

    h2 {
        color: var(--text-title);
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 2rem;
    }

    h3 {
        color: var(--text-title);
        font-size: 1.5rem;
        font-weight: 600;
        margin-bottom: 1rem;
    }

    p {
        /* margin: 0.3rem auto 0 auto; */
        /* text-align: center; */
        padding: 0.8rem 0;
        span {
            font-size: 1rem;
            color: var(--text-secondary);
        }
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

export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;

    h2 {
        text-align: left;
        margin-bottom: 3rem;
        margin-top: 1rem;
        color: var(--text-title);
    }

    button {
        font-size: 1rem;
        margin-bottom: 3rem;
        margin-top: 1rem;
        padding: 0 2rem;
        border: 1px solid var(--text-body);
    }
`;