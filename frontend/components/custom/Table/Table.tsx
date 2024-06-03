"use client"
import React, { useState } from "react"

import {
  Table as TableComponent,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { IoIosMore } from "react-icons/io"

function Table({ columns, rows }: any) {
  const [tableRows, setTableRows] = useState<any>(rows)

  function handleCloseAccount(userEmail: string) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/delete`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: userEmail
        }
      }),
      credentials: 'include'
    }).then(() => {
        setTableRows({
          data: tableRows?.data.filter((row: any) => row.email !== userEmail)
        })
      })
  }

  function handleRoleChange(role: string, userEmail: string) {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/update`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: {
          email: userEmail,
          role: role
        }
      }),
      credentials: 'include'
    }).then(() => {
        setTableRows({
          data: tableRows?.data.map((row: any) => {
            if (row.email === userEmail) {
              row.role = role
            }
            return row
          })
        })
    })
  }

  return (
    <TableComponent>
      <TableHeader>
        <TableRow>
          {columns?.map((column: any, index: any) => (
            <TableCell className={`${columns.length - 1 === index ? "text-right" : ""}`} key={column}>{column}</TableCell>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tableRows?.data.map((userData: any) => (
          <TableRow key={userData.id}>
            <TableCell className="font-medium">{userData.name} {userData.surname}</TableCell>
            <TableCell>{userData.email}</TableCell>
            <TableCell>{userData.address}</TableCell>
            <Select onValueChange={
              (event) => handleRoleChange(event, userData.email)
            }>
              <SelectTrigger className="w-[180px] focus:outline-none focus:ring-0 mt-3">
                <SelectValue placeholder={`${userData.role}`} />
              </SelectTrigger>
              <SelectContent >
                <SelectItem value="admin">admin</SelectItem>
                <SelectItem value="user">user</SelectItem>
              </SelectContent>
            </Select>
            <TableCell className="text-right">{new Date(userData.createdAt).toLocaleDateString("en-GB")}</TableCell>
            <TableCell>
              <Dropdown userEmail={userData.email} handleCloseAccount={handleCloseAccount} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableComponent>
  )
}

function Dropdown({ userEmail, handleCloseAccount }: { userEmail: string, handleCloseAccount: (email: string) => void } ) {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger className="rounded-sm p-1 text-textBase hover:bg-black/5 focus:outline-none dark:text-textBaseDark dark:hover:bg-black/20">
        <IoIosMore size={23} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem onClick={
          () => handleCloseAccount(userEmail)
        }>
          <p className="cursor-pointer text-red-500">
            Close account
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Table
