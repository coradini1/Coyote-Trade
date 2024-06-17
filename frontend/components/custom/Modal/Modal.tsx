import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Toaster } from "@/components/ui/toaster";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";

function Modal({ onClose, userData }: any) {
  const { toast } = useToast();

  const [updateUserInfo, setUpdateUserInfo] = useState({
    role: "",
    name: "",
    surname: "",
    address: "",
  });

  useEffect(() => {
    console.log(userData, "userData");
  }, [userData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUpdateUserInfo({
      ...updateUserInfo,
      [e.target.id]: e.target.value,
    });
  };

  function handleSubmit(userEmail: string) {
    console.log(updateUserInfo, "updateUserInfo");
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user/update`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          email: userEmail,
          role: updateUserInfo.role,
          name: updateUserInfo.name,
          surname: updateUserInfo.surname,
          address: updateUserInfo.address,
        },
      }),
      credentials: "include",
    }).then(() => {
      toast({
        title: "Success",
        description: "User updated successfully",
        duration: 5000,
      });
    });
  }

  return (
    <>
      <Dialog open={true} onOpenChange={onClose}>
        <DialogTrigger>Open</DialogTrigger>
        <div className="dark">
          <Toaster />
          <DialogContent className="sm:max-w-[425px] bg-foregroundDark dark:bg-foregroundDark">
            <DialogHeader>
              <DialogTitle className="text-white">Edit profile</DialogTitle>
              <DialogDescription className="text-white">
                Make changes to users profiles here. Click save when you&#39;re
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right text-white">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={userData?.name}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="surname" className="text-right text-white">
                  Surname
                </Label>
                <Input
                  id="surname"
                  defaultValue={userData?.surname}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-white">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={userData?.email}
                  className="col-span-3"
                  disabled={true}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right text-white">
                  Address
                </Label>
                <Input
                  id="address"
                  defaultValue={userData?.address}
                  className="col-span-3"
                  onChange={handleChange}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right text-white">
                  Role
                </Label>
                <Select
                  // onValueChange={(event) =>
                  //   handleRoleChange(event, userData.email)
                  // }
                  onValueChange={(event) => {
                    setUpdateUserInfo({
                      ...updateUserInfo,
                      role: event,
                    });
                  }}
                >
                  <SelectTrigger className="w-[180px] focus:outline-none focus:ring-0 mt-3">
                    <SelectValue placeholder={`${userData.role}`} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">admin</SelectItem>
                    <SelectItem value="user">user</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="createdAt" className="text-right text-white">
                  Created At
                </Label>
                <Input
                  id="createdAt"
                  defaultValue={userData?.createdAt}
                  className="col-span-3"
                  disabled={true}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={() => handleSubmit(userData.email)}
                type="submit"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </div>
      </Dialog>
    </>
  );
}

export default Modal;
