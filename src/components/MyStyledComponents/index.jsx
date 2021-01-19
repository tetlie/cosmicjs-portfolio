import styled from 'styled-components'

export const Container = styled.div`
  width: 96%;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`

export const PageTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;

  @media screen and (max-width: 768px) {
    font-size: 40px;
  }

  @media screen and (max-width: 480px) {
    font-size: 32px;
  }
`

export const P = styled.p`
  margin-top: 24px;
  color: #000;
  font-size: 24px;
  text-align: center;
  max-width: 600;

  @media screen and (max-width: 768px) {
    font-size: 24px;
  }

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`