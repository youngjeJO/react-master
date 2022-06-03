import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';
import { useRecoilValue } from 'recoil';
import { isDarkAtom } from '../atoms';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);

  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );

  const candleData = data?.map((price) => ({
    x: price.time_open,
    y: [price.open.toFixed(2), price.high.toFixed(2), price.low.toFixed(2), price.close.toFixed(2)],
  }));

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type='candlestick'
          series={
            [
              {
                name: 'price',
                data: candleData,
              },
            ] as unknown as number[]
          }
          options={{
            theme: { mode: isDark ? 'dark' : 'light' },
            chart: {
              toolbar: { show: false },
            },
            xaxis: {
              type: 'datetime',
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: '#eb4d4b',
                  downward: '#4834d4',
                },
                wick: {
                  useFillColor: true,
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
