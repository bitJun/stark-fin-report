import { useState } from 'react';
import {
  Container,
  Typography
} from '@mui/material';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import RevenueChart from '@/components/RevenueChart';
import RevenueTable from '@/components/RevenueTable';
import { getMonthlyRevenue } from '@/lib/api';
import dayjs from 'dayjs';

interface propsData {
  date: string
  industry_category: string
  stock_id: string
  stock_name: string
  type: string
}

interface itemProps {
  date: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
  stock_id: string;
  country: string;
}

export default function Home() {
  const [list, setList] = useState<Array<itemProps>>([]);
  const [data, setData] = useState<Array<propsData>>([]);
  const [code, setCode] = useState<string>('');

  const onSearchData = async() => {
    const params = {
      dataset: 'TaiwanStockInfo',
      data_id: code
    }
    const res = await getMonthlyRevenue(params)
    console.log('jsons', res);
    setData(res);
  }

  const onLoadChart = async() => {
    const params = {
      dataset: 'TaiwanStockMonthRevenue',
      data_id: code,
      start_date: dayjs().startOf('year').format('YYYY-MM-DD'),
      end_date: dayjs().endOf('year').format('YYYY-MM-DD'),
    }
    const res = await getMonthlyRevenue(params);
    setList(res);
    console.log('json', res);
  }

  return (
    <Container>
      <Stack
        spacing={2}
        direction="row"
      >
        <TextField
          id="outlined-basic"
          label="请输入企业code"
          variant="outlined"
          value={code}
          onChange={(e)=>{setCode(e.target.value)}}
        />
        <Button
          variant="contained"
          onClick={()=>{
            if (!code) {
              alert('请输入企业code')
              return;
            }
            onSearchData();
            onLoadChart();
          }}
        >
          submit
        </Button>
      </Stack>
      {
        data.length > 0 ? (
          <>
            {
              data[0] ? (
                <Typography variant="h4" gutterBottom>{data[0]?.stock_name || ''}（{code}） - 月营收</Typography>
              ) : ''
            }
            
            <RevenueChart data={list} />
            <RevenueTable data={list} />
          </>
        ) : (
          <Stack>暂无数据</Stack>
        )
      }
    </Container>
  );
}