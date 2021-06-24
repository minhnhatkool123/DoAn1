import '../scss/statistics.scss';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../recoil/userState';
import axios from 'axios';
import { statisticsByMonth, statisticsByCategory, soldQuantityByCategory, soldCategoryMonthly } from '../data/statistics';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Legend, Bar } from 'recharts';

function Statistics() {
  const user = useRecoilValue(userState);

  return (
    <div className="statistics">
      <div className="chart-zone">
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

        <div className="sold-category-monthly">
          <ResponsiveContainer>
            <BarChart
              width={500}
              height={300}
              data={soldCategoryMonthly.data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              {/* <CartesianGrid strokeDasharray="3 3" /> */}
              <XAxis dataKey="Month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Ao" fill="#8884d8" />
              <Bar dataKey="Quan" fill="#ffc355" />
              <Bar dataKey="DamVay" fill="#ff7eae" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="overview">
        <div className="category-overview shirt">
          <div className="category-name">Áo</div>
          <div className="total-control">
            <div className="total-title">Tổng doanh thu</div>
            <div className="total-value">20,455,000đ</div>
          </div>
          <div className="total-control">
            <div className="total-title">Tổng số lượng bán</div>
            <div className="total-value">219</div>
          </div>
        </div>

        <div className="category-overview pants">
          <div className="category-name">Quần</div>
          <div className="total-control">
            <div className="total-title">Tổng doanh thu</div>
            <div className="total-value">20,455,000đ</div>
          </div>
          <div className="total-control">
            <div className="total-title">Tổng số lượng bán</div>
            <div className="total-value">219</div>
          </div>
        </div>

        <div className="category-overview dress-skirt">
          <div className="category-name">Đầm váy</div>
          <div className="total-control">
            <div className="total-title">Tổng doanh thu</div>
            <div className="total-value">20,455,000đ</div>
          </div>
          <div className="total-control">
            <div className="total-title">Tổng số lượng bán</div>
            <div className="total-value">219</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Statistics;