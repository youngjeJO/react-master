import { useQuery } from 'react-query';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from './api';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { isDarkAtom } from '../atoms';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button {
    margin-top: 10px;
    padding: 5px;
    border: none;
    background-color: ${(props) => props.theme.textColor};
    color: ${(props) => props.theme.bgColor};
    border-radius: 20px;
  }
`;

const CoinsList = styled.ul``;

const Coin = styled.li<{ isDark: boolean }>`
  background-color: ${(props) => (props.isDark ? props.theme.textColor : props.theme.bgColor)};
  color: ${(props) => (props.isDark ? props.theme.bgColor : props.theme.textColor)};
  margin-bottom: 10px;
  border-radius: 15px;
  font-weight: bold;
  box-shadow: 5px 5px 5px ${(props) => (props.isDark ? props.theme.bgColor : 'gray')};
  a {
    padding: 20px;
    transition: color 0.4s ease-in;
    display: flex;
    align-items: center;
  }
  :hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.div`
  text-align: center;
  font-size: 24px;
  color: ${(props) => props.theme.textColor};
`;

const Icon = styled.img`
  width: 24px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>('allCoins', fetchCoins);
  const setterFn = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <Container>
      <Helmet>
        <title>Coins</title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
        <button onClick={() => setterFn((prev) => !prev)}>{isDark ? 'Light' : 'Dark'} Mode</button>
      </Header>
      {isLoading ? (
        <Loader>loading</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id} isDark={isDark}>
              <Link to={`/${coin.id}`} state={{ name: coin.name, rank: coin.rank }}>
                <Icon
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
