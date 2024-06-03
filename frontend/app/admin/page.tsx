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
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const userData = await response.json()

      if (userData?.user?.role !== "admin" || !userData) {
        return window.location.href = "/login"
      }

      const metrics = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/metrics/trends`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const userMetrics = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/metrics/users?page=1&limit=15`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })

      const metricsJson = await metrics.json()
      const userMetricsJson = await userMetrics.json()

      setUser(userData.user)
      setUsers(userMetricsJson)
      setData(metricsJson)
    }

    fetchData()
  }, [])

  return (
    <div>
      <div className="flex h-screen flex-col bg-base dark:bg-baseDark">
        {data ? (
          <>
            <div className="flex flex-col gap-3 md:w-full md:flex-row">
              <div className="mb-3 ml-3 mt-3 flex w-5/12 flex-col items-center justify-center rounded-lg border-2 border-solid border-lavender bg-white p-4 dark:bg-foregroundDark">
                <div className="mb-8 mt-3 flex w-full justify-between">
                  <h3 className="flex items-center justify-center gap-2 text-xl text-textBase dark:text-textBaseDark">
                    <TbUsers size={28} className="text-lavender" /> Users
                  </h3>
                  <p className="text-textBase dark:text-textBaseDark">Last 7 days</p>
                </div>
                <BarGraph width="100%" height={250} data={data} />
              </div>


              <div className="mb-3 mr-3 mt-3 flex w-8/12 flex-col items-center justify-center rounded-lg border-2 border-solid border-lavender bg-white dark:bg-foregroundDark">
                <h1 onClick={
                  () => {
                    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, {
                      method: 'GET',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      credentials: 'include'
                    }).then(() => {
                      window.location.href = "/login"
                    })
                  }
                } className="cursor-pointer rounded-md border-2 border-solid border-red-700 px-6 py-3 font-medium text-red-700 transition-all duration-200 ease-out hover:bg-red-700 hover:text-white dark:text-textBaseDark">Log out</h1>
              </div> 
            </div>

            <div className="mx-3 mb-3 flex flex-col items-center justify-center overflow-scroll rounded-lg border-2 border-solid border-lavender bg-white p-4 dark:bg-foregroundDark">
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
