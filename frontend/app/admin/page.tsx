"use client"
import React, { useEffect, useState } from "react"

import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts'

const data = [
  {
    date: "01/09",
    users_gain: 5,
  },
  {
    date: "02/09",
    users_gain: 3,
  },
  {
    date: "03/09",
    users_gain: 10,
  },
  {
    date: "04/09",
    users_gain: 2,
  },
  {
    date: "05/09",
    users_gain: 5,
  },
  {
    date: "06/09",
    users_gain: 1,
  },
  {
    date: "07/09",
    users_gain: 15,
  }
]


export default function Page() {

  return (
    <div className="dark">
      <div className="w-screen h-screen bg-base dark:bg-baseDark flex flex-col items-center justify-center">
        <div className="relative flex flex-col justify-center gap-20 items-center bg-white dark:bg-foregroundDark min-w-[450px] min-h-[548px] py-8 px-12 border-lavender border-solid border-2 rounded-xl shadow-xl transition-colors ease-out duration-300">
          <h1 className="font-bold text-textBase dark:text-textBaseDark text-2xl">New user sign ups in the last week</h1>
          <div className="mr-20">
          <AreaChart
            width={750}
            height={300}
            data={data}
            {...{
              overflow: "visible"
            }}
            margin={{
              top: 10,
              right: 30,
              bottom: 0,
              left: 5
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7287fd" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#7287fd" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="users_gain" fillOpacity={0.1} strokeWidth={3} stroke="#7287fd" fill="#7287fd" />
            <XAxis tickLine={false} stroke="#cdd6f4" dataKey="date" dx={25} />
            <YAxis tickLine={false} stroke="#cdd6f4" dy={-15} />
            <Tooltip />
          </AreaChart>
          </div>
        </div>
      </div>
    </div>
  )
}
