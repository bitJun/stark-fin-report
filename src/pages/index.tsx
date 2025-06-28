import { useEffect, useState } from 'react';
import {
  Container,
  Typography
} from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import RevenueChart from '@/components/RevenueChart';
import RevenueTable from '@/components/RevenueTable';
import { getMonthlyRevenue } from '@/lib/api';
import dayjs from 'dayjs';

export default function Home() {
  const [list, setList] = useState<any[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [code, setCode] = useState<string>('');

  const onSearchData = async() => {
    let params:any = {
      dataset: 'TaiwanStockInfo',
      data_id: code
    }
    let res:any = await getMonthlyRevenue(params)
    console.log('jsons', res);
    setData(res);
  }

  const onLoadChart = async() => {
    let params:any = {
      dataset: 'TaiwanStockMonthRevenue',
      data_id: code,
      start_date: dayjs().startOf('year').format('YYYY-MM-DD'),
      end_date: dayjs().endOf('year').format('YYYY-MM-DD'),
    }
    let res:any = await getMonthlyRevenue(params);
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
            <Typography variant="h4" gutterBottom>{data[0]?.stock_name}（{code}） - 月营收</Typography>
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