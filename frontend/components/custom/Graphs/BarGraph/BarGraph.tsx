import React from "react"

import {
  ResponsiveContainer,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid,
} from 'recharts'

function BarGraph({ data, width, height }: any) {
  return (
    <ResponsiveContainer width={width} height={height}>
      <BarChart margin={{top: 20, right: 20, bottom: 20, left: 20}} data={data}>
        <CartesianGrid stroke="#323244" vertical={false} />
        <Bar dataKey="users_gain"
          className="rounded-xl"
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
          dataKey="DATE"
          axisLine={false}
          tickFormatter={
            (DATE) => {
              const dateObj = new Date(DATE)
              dateObj.setDate(dateObj.getDate() + 1)
              return dateObj.toLocaleDateString('en-GB', { weekday: 'short' })
            }
          }
        />
        <YAxis width={20} tickLine={false} axisLine={false} stroke="#cdd6f4" allowDecimals={false}  />
        <Tooltip content={
          ({ active, payload, label }: any) => {
            if (active) {
              const dateObj = new Date(label)
              dateObj.setDate(dateObj.getDate() + 1)
              label = dateObj.toLocaleDateString('en-GB')
              return (
                <div className="rounded-xl bg-white p-4 text-textBase shadow-lg dark:bg-foregroundDark dark:text-textBaseDark">
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
