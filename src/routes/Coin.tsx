import { useQuery } from 'react-query';
import { Link, Route, Routes, useLocation, useMatch, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { informaionData } from './api';
import { priceData } from './api';
import Chart from './Chart';
import Price from './Price';
import { Helmet } from 'react-helmet';
import { useRecoilValue } from 'recoil';
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
  justify-content: center;
  align-items: center;
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div<{ isDark: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => (props.isDark ? props.theme.textColor : props.theme.bgColor)};
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) => (props.isActive ? props.theme.accentColor : '#f5f6fa')};
  a {
    display: block;
  }
`;

interface StateInterface {
  name: string;
}

interface InformaionData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

export interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const state = useLocation().state as StateInterface;
  const isDark = useRecoilValue(isDarkAtom);
  const priceMatch = useMatch('/:coinId/price');
  const chartMatch = useMatch('/:coinId/chart');
  const { isLoading: infoLoading, data: infoData } = useQuery<InformaionData>(
    ['info', coinId],
    () => informaionData(coinId)
  );
  const { isLoading: priceLoading, data: pcData } = useQuery<PriceData>(
    ['price', coinId],
    () => priceData(coinId),
    { refetchInterval: 5000 }
  );

  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        <title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</title>{' '}
      </Helmet>
      <Header>
        <Link to='/'>
          <Title>{state?.name ? state.name : loading ? 'Loading...' : infoData?.name}</Title>
        </Link>
      </Header>
      {loading ? (
        <Loader>loading</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem isDark={isDark}>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem isDark={isDark}>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem isDark={isDark}>
              <span>Price:</span>
              <span>${pcData?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem isDark={isDark}>
              <span>Total Suply:</span>
              <span>{pcData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem isDark={isDark}>
              <span>Max Supply:</span>
              <span>{pcData?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to='chart'>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to='price'>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path='chart' element={<Chart coinId={coinId as string} />} />
            <Route path='price' element={<Price coinId={coinId as string} />} />
          </Routes>
        </>
      )}
    </Container>
  );
}

export default Coin;
