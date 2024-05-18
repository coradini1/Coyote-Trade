import React from "react"

import {
  ResponsiveContainer,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts'

function BarGraph({ data, width, height }: any) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart data={data}>
        <CartesianGrid stroke="#cdd6f4" strokeDasharray="3 3" />
        <Bar dataKey="users_gain"
          className="rounded-xl"
          background={<Rectangle fill="#cdd6f4" fillOpacity={0.1} radius={[10, 10, 0, 0]} />}
          barSize={50}
          radius={[10, 10, 0, 0]}
          stroke="#7287fd"
          activeBar={<Rectangle fill="#d1d7fe" />}
          strokeWidth={1}
          fillOpacity={1}
          fill="#7287fd"
        />
        <XAxis
          tickLine={false}
          stroke="#cdd6f4"
          dataKey="date"
          tickFormatter={
            (date) => {
              const dateObj = new Date(date)
              return dateObj.toLocaleDateString('en-US', { weekday: 'short' })
            }
          }
        />
        <YAxis width={20} tickLine={false} stroke="#cdd6f4"  />
        <Tooltip content={
          ({ active, payload, label }: any) => {
            if (active) {
              const dateObj = new Date(label)
              label = dateObj.toLocaleDateString('en-GB')
              return (
                <div className="bg-white dark:bg-foregroundDark text-textBase dark:text-textBaseDark p-4 rounded-xl shadow-lg">
                  <p>{`Date: ${label}`}</p>
                  <p>{`New users: ${payload[0].value}`}</p>
                </div>
              )
            }
            return null
          }
        } cursor={{fill: 'none'}} />
      </BarChart>
    </ResponsiveContainer>
  )
}



export default BarGraph
