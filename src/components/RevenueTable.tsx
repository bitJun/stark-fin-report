import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

interface propsData {
  date: string;
  revenue: number;
  revenue_month: number;
  revenue_year: number;
  stock_id: string;
  country: string;
}

export default function RevenueTable({ data }: { data: Array<propsData> }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>日期</TableCell>
          <TableCell>营收（百万）</TableCell>
          {/* <TableCell>月增率 (%)</TableCell>
          <TableCell>年增率 (%)</TableCell> */}
        </TableRow>
      </TableHead>
      <TableBody>
        {data.map((row: propsData, i) => (
          <TableRow key={i}>
            <TableCell>{row?.date}</TableCell>
            <TableCell>{row?.revenue / 1000000}(百万)</TableCell>
            {/* <TableCell>{row.monthly_growth}</TableCell>
            <TableCell>{row.yearly_growth}</TableCell> */}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}