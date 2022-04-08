import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components"
import { fetchCoins } from "../api";
import {Helmet} from 'react-helmet'
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atom";


const Container = styled.div`
  padding: 0px 20px;
  margin: 0 auto;
  /* max-width : 480px; */
  `;

const Header =styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  button{
    padding: 10px;
    border: none;
    cursor: pointer;
  }&:hover{
    button{
      color: pink;
    }
  }
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 30px;
`

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  padding: 20px;
  margin-bottom: 10px;
  border-radius: 15px;
  border: 1px solid white;
  a{
    display: flex;
    align-items: center;
    transition: color 0.2s ease-in-out;

  }
  &:hover{
    a{
      /* display: block; */
      color: ${props => props.theme.accentColor };
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 3 5px;
  margin-right: 10px;
`
const Title = styled.h1`
  font-size: 48px;
  color:${props=>props.theme.accentColor};
`
const Loader = styled.span`
  text-align: center;
  display: block;
`


interface ICoin{
  id:string,
  name:string,
  symbol:string,
  rank:number,
  is_new:boolean,
  is_active:boolean,
  type:string,
}

interface RouterState {
  name: string;
  } 

function Coins(){ 
  const setDarkAtom = useSetRecoilState(isDarkAtom)
  const toggleDarkAtom = () => setDarkAtom(current=>!current)
  const {isLoading ,data} = useQuery<ICoin[]>('allCoins',fetchCoins)
  
  return(
    <Container>
      <Helmet>
        <title>
          코인
        </title>
      </Helmet>
      <Header>
        <Title>Coin</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      <CoinsList>
        {isLoading ? <Loader>Loading....</Loader> :
        data?.slice(0,100).map((coin) =>
        <Coin key={coin.id}>        
          <Link to={{pathname:`/${coin.id}`}} state={{name:coin.name}}>
            <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
            {coin.name} &rarr;            
            </Link>
          </Coin>)}
      </CoinsList>
    </Container>
  )
}

export default Coins  

      