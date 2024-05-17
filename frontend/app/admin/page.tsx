"use client"
import Spinner from "@/components/custom/Spinner/Spinner"
import React, { useEffect, useState } from "react"

import { Rectangle, XAxis, YAxis, Tooltip, BarChart, Bar } from 'recharts'

export default function Page() {
  const [data, setData] = useState<any>()
  const [user, setUser] = useState<any>()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const metrics = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/metrics/trends`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const metricsJson = await metrics.json()
      const dataJson = await response.json()
      setUser(dataJson.user)
      setData(metricsJson)
    }

    fetchData()
  }, [])

  return (
    <div className="dark">
      <div className="w-screen h-screen bg-base dark:bg-baseDark flex flex-col items-center justify-center">
        <div className="relative flex flex-col justify-center gap-20 items-center bg-white dark:bg-foregroundDark min-w-[450px] min-h-[548px] py-8 px-12 border-lavender border-solid border-2 rounded-xl shadow-xl transition-colors ease-out duration-300">
          {data ? (
            <>
              <h1 className="font-bold text-textBase dark:text-textBaseDark text-3xl mb-5">Oi {user?.name}, veja as contas criadas nos ultimos 7 dias</h1>
              <div className="mr-2">
                <BarChart
                  width={1050}
                  height={300}
                  data={data}
                >
                  <Bar dataKey="users_gain"
                    className="rounded-xl"
                    background={<Rectangle fill="#cdd6f4" fillOpacity={0.1} radius={[10, 10, 0, 0]} />}
                    barSize={30} width={10}
                    radius={[10, 10, 0, 0]}
                    stroke="#7287fd"
                    activeBar={<Rectangle fillOpacity={0.3} />}
                    strokeWidth={1}
                    fillOpacity={1}
                    fill="#7287fd"
                  />
                  <XAxis tickLine={false} stroke="#cdd6f4" dataKey="date" />
                  <YAxis tickLine={false} stroke="#cdd6f4"  />
                  <Tooltip cursor={{fill: 'none'}} />
                </BarChart>
              </div>
            </>
          ) : (
                <>
                  <h1 className="text-textBase dark:text-textBaseDark">{user?.name}</h1>
                </>
              )}
        </div>
      </div>
    </div>
  )
}
