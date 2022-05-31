import { useQuery } from 'react-query';
import styled from 'styled-components';
import { priceData } from './api';
import { PriceData } from './Coin';

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading: priceLoading, data: pcData } = useQuery<PriceData>(
    ['price', coinId],
    () => priceData(coinId)
    // { refetchInterval: 5000 }
  );

  const quotesData = pcData?.quotes.USD;
  console.log(pcData);

  return (
    <>
      {priceLoading ? (
        'Loading chart...'
      ) : (
        <Overview>
          <OverviewItem>
            <span>ath_price</span>
            <span>{quotesData?.ath_price}</span>
          </OverviewItem>
          <OverviewItem>
            <span>change 24h</span>
            <span>${quotesData?.percent_change_24h}</span>
          </OverviewItem>
          <OverviewItem>
            <span>volume</span>
            <span>${quotesData?.volume_24h.toFixed(2)}</span>
          </OverviewItem>
        </Overview>
      )}
    </>
  );
}

export default Price;
