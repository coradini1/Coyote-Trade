import React from "react"

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

import { IoIosMore } from "react-icons/io"

function Table({ columns, rows }: any) {
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
        {rows?.data.map((userData: any) => (
          <TableRow key={userData.id}>
            <TableCell className="font-medium">{userData.name} {userData.surname}</TableCell>
            <TableCell>{userData.email}</TableCell>
            <TableCell>{userData.address}</TableCell>
            <TableCell>{userData.role}</TableCell>
            <TableCell className="text-right">{new Date(userData.createdAt).toLocaleDateString("en-GB")}</TableCell>
            <TableCell>
              <Dropdown />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableComponent>
  )
}

function Dropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="text-textBase dark:text-textBaseDark hover:bg-black/5 dark:hover:bg-black/20 p-1 rounded-sm">
        <IoIosMore size={23} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>View details</DropdownMenuItem>
        <DropdownMenuItem>
          <p className="text-red-500">
            Close account
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Table
