"use client";
import React, { useEffect, useState } from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { TbUsers } from "react-icons/tb";
import BarGraph from "@/components/custom/Graphs/BarGraph/BarGraph";
import Table from "@/components/custom/Table/Table";
import ModalOrders from "@/components/custom/ModalOrders/ModalOrders";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

export default function Page() {
  const [data, setData] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any>(null);
  const [totalAssetsTraded, setTotalAssetsTraded] = useState<any>(null);
  const [totalUsersBalance, setTotalUsersBalance] = useState<any>(null);
  const [totalUsers, setTotalUsers] = useState<any>(null);
  const [orderData, setOrderData] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const userData = await response.json();

      if (userData?.user?.role === "user") {
        return (window.location.href = "/dashboard");
      }
      if (userData?.user?.role !== "admin" || !userData) {
        return (window.location.href = "/login");
      }

      const metricsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/metrics/trends`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const metricsJson = await metricsResponse.json();

      const userMetricsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/metrics/users?page=1&limit=200`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const userMetricsJson = await userMetricsResponse.json();

      setUser(userData.user);
      setUsers(userMetricsJson);
      setData(metricsJson);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchTotalAssetsTraded() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/total-assets-traded`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data) {
        setTotalAssetsTraded(data.data.sumQuantity);
        setOrderData(data.orders);
        console.log(data.orders);
      }
    }

    fetchTotalAssetsTraded();
  }, []);

  useEffect(() => {
    async function fetchTotalUsersAndBalance() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/total-users-balance`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (data) {
        setTotalUsersBalance(data.data.sumBalance);
        setTotalUsers(data.data.countUsers);
      }
    }

    fetchTotalUsersAndBalance();
  }, []);

  if (!data || !user || !users) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-textBase dark:text-textBaseDark text-center">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 border-b-2 border-solid border-lavender p-4">
        <h1 className="text-textBase dark:text-textBaseDark text-center flex items-center gap-2">
          Logged as admin: {user?.name}
        </h1>
        <IoLogOutOutline
          size={30}
          className="cursor-pointer text-red-700 transition-all duration-200 ease-out hover:bg-red-700 hover:text-white dark:text-textBaseDark"
          onClick={() => {
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/logout`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            }).then(() => {
              window.location.href = "/login";
            });
          }}
        />
      </div>
      <div className="flex gap-3 md:flex-row">
        <div className="mb-3 ml-3 mt-3 flex w-5/12 flex-col items-center justify-center rounded-lg border-2 border-solid border-lavender bg-white p-4 dark:bg-foregroundDark">
          <div className="mb-8 mt-3 flex w-full justify-between">
            <h3 className="flex items-center justify-center gap-2 text-xl text-textBase dark:text-textBaseDark">
              <TbUsers size={28} className="text-lavender" /> Users
            </h3>
            <p className="text-textBase dark:text-textBaseDark">Last 7 days</p>
          </div>
          <BarGraph width="100%" height={250} data={data} />
        </div>

        <div className="grid grid-cols-1 gap-4 mb-3 mt-3">
          <div className="flex flex-col text-center items-center justify-center rounded-lg border-2 border-lavender bg-white p-4 dark:bg-foregroundDark">
            <h1 className="text-textBase dark:text-textBaseDark text-lg font-semibold mb-2">
              Total Users
            </h1>
            <h1 className="text-4xl font-bold text-textBase dark:text-textBaseDark">
              {Number(totalUsers)}
            </h1>
          </div>
          <div
            onClick={() => setIsModalOpen(true)} 
            className="flex flex-col cursor-pointer justify-center items-center rounded-lg border-2 border-lavender  bg-lavender p-4 dark:bg-foregroundDark"
          >
            <button className="text-textBase text-white color dark:text-textBaseDark">
              Total Orders
            </button>
          </div>
        </div>

        <div className="mb-3 mr-3 mt-3 flex w-3/12 flex-col items-center justify-center rounded-lg border-2 border-solid border-lavender bg-white p-4 dark:bg-foregroundDark">
          <h1 className="text-textBase dark:text-textBaseDark">
            Total Users Balance
          </h1>
          <h1 className="text-4xl font-bold text-textBase dark:text-textBaseDark">
            $
            {Number(totalUsersBalance)
              .toFixed(2)
              .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
          </h1>
        </div>

        <div className="mb-3 mr-3 mt-3 flex w-3/12 flex-col items-center justify-center rounded-lg border-2 border-solid border-lavender bg-white p-4 dark:bg-foregroundDark">
          <h1 className="text-textBase dark:text-textBaseDark">
            Total Assets Traded
          </h1>
          <h1 className="text-4xl font-bold text-textBase dark:text-textBaseDark">
            {Number(totalAssetsTraded)}
          </h1>
        </div>
      </div>

      <div className="mx-3 mb-3 flex flex-col items-center justify-center overflow-scroll rounded-lg border-2 border-solid border-lavender bg-white p-4 dark:bg-foregroundDark">
        <Table
          columns={["Full Name", "Email", "Address", "Role", "Created At"]}
          rows={users}
        />
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl p-6 bg-white dark:bg-foregroundDark rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          <ModalOrders orderData={orderData} />
          <DialogFooter>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
