import { useQuery } from 'react-query';
import { fetchCoinHistory } from './api';
import ApexChart from 'react-apexcharts';

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
  const { isLoading, data } = useQuery<IHistorical[]>(
    ['ohlcv', coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 10000 }
  );
  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : (
        <ApexChart
          type='line'
          series={[
            {
              name: 'price',
              data: data?.map((price) => price.close) as number[],
            },
          ]}
          options={{
            theme: { mode: 'dark' },
            chart: {
              background: '#2f3640',
              height: 500,
              width: 500,
              toolbar: { show: false },
              foreColor: 'transparent',
            },
            stroke: { curve: 'smooth' },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              type: 'datetime',
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: 'gradient',
              gradient: { gradientToColors: ['#55efc4'], stops: [0, 100] },
            },
            colors: ['#8c7ae6'],
            tooltip: {
              y: { formatter: (value) => `$ ${value.toFixed(3)}` },
              // x: { formatter: [] },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
