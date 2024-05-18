"use client"
import React, { useEffect, useState } from "react"

import BarGraph from "@/components/custom/Graphs/BarGraph/BarGraph"
import Table from "@/components/custom/Table/Table"
import { TbUsers } from "react-icons/tb"

export default function Page() {
  const [data, setData] = useState<any>()
  const [user, setUser] = useState<any>()
  const [users, setUsers] = useState<any>()

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin-dashboard`, {
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

      const userMetrics = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/metrics/users?page=1&limit=5`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const metricsJson = await metrics.json()
      const userMetricsJson = await userMetrics.json()
      const dataJson = await response.json()

      if (dataJson?.user?.role !== "admin" || !dataJson) {
        return window.location.href = "/login"
      }

      setUser(dataJson.user)
      setUsers(userMetricsJson)
      setData(metricsJson)
    }

    fetchData()
  }, [])

  return (
    <div className="dark">
      <div className="dark:bg-baseDark bg-base h-screen flex flex-col">
        {data ? (
          <>
            <div className="flex gap-3">
              <div className="bg-white dark:bg-foregroundDark w-4/12 p-4 flex flex-col ml-3 mb-3 mt-3 items-center justify-center rounded-lg border-solid border-2 border-lavender">
                <div className="flex w-full justify-between mt-3 mb-8">
                  <h3 className="text-textBase dark:text-textBaseDark flex text-xl justify-center items-center gap-2">
                    <TbUsers size={28} className="text-lavender" /> Users
                  </h3>
                  <p className="text-textBase dark:text-textBaseDark">Last 7 days</p>
                </div>
                <BarGraph width="100%" height={250} data={data} />
              </div>


              <div className="bg-white dark:bg-foregroundDark w-8/12 flex flex-col mb-3 mt-3 mr-3 items-center justify-center rounded-lg border-solid border-2 border-lavender">
                <h1 className="dark:text-textBaseDark">Tem que terminar mds</h1>
              </div> 
            </div>

            <div className="bg-white overflow-scroll dark:bg-foregroundDark p-4 flex flex-col mb-3 mx-3 items-center justify-center rounded-lg border-solid border-2 border-lavender">
              <Table
                columns={[
                  "Full Name",
                  "Email",
                  "Address",
                  "Role",
                  "Created At",
                ]}
                rows={users}
              />
            </div>
          </>
        ) : (
            <>
              <h1 className="text-textBase dark:text-textBaseDark">{user?.name}</h1>
            </>
          )}
      </div>
    </div>
  )
}
