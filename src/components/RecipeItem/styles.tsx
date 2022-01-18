import styled from 'styled-components';

export const Container = styled.div`

    li { 
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 1px solid #ddd;
        padding-right: 1rem;

        & + li {
            
        }
    }
`

export const ListMenu = styled.div`
    button {
        border: none;

        & + button {
            margin-left: 1rem;
        }
    }
`;

export const ListPanel = styled.div`

    padding: 1rem;

    &:hover {
        cursor: pointer;
        background-color: #ddd;
    }

    p{
        color: var(--text-body);
    }
`;