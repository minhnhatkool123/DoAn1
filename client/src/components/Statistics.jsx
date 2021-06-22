import '../scss/statistics.scss';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userState';
import axios from 'axios';
import { statisticsByMonth, statisticsByCategory, soldQuantityByCategory } from '../data/statistics';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function Statistics() {
  const user = useRecoilValue(userState);

  return (
    <React.Fragment>
      <div className="monthly-sales">
        <ResponsiveContainer>
          <AreaChart
            data={statisticsByMonth.data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0
            }}
          >
            <defs>
              <linearGradient id="monthlySalesColor" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="month" />
            <YAxis width={80} />
            <Tooltip />
            <Area type="monotone" dataKey="total" stroke="#8884d8" fill="url(#monthlySalesColor)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

    </React.Fragment>
  );
}

export default Statistics;