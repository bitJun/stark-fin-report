import axios from 'axios';

const BASE_URL = 'https://api.finmindtrade.com/api/v4';

interface paramsProps {
  dataset: string
  data_id: string
  start_date?: string
  end_date?: string
}

export const getMonthlyRevenue = async (params: paramsProps) => {
  const res = await axios.get(`${BASE_URL}/data`, {
    params: params,
  });
  console.log('res', res);
  return res.data.data;
};
