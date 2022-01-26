import styled from 'styled-components'

export const BtnElement = styled.button`
  background-color: transparent;
  border: none;
  align-items: center;
  cursor: pointer;
  max-width: 50%;
`
export const LoaderContainer = styled.div`
  height: 60vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
export const BannerContainer = styled.div`
  height: 25vh;
  font-family: 'roboto';
  padding: 15px;
  width: 100%;
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
`

export const SearchBtn = styled.button`
  width: 50px;
`

export const CustomBtn = styled.button`
  width: 100px;
  height: 35px;
  background-color: #00306e;
  color: #ffffff;
  border-radius: 8px;
`
