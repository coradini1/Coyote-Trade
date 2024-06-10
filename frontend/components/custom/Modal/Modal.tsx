import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
  } from "@/components/ui/dialog";
  
  import { Button } from "@/components/ui/button";
  import { Input } from "@/components/ui/input";
  import { Label } from "@/components/ui/label";

  
  
  function Modal({ onClose, userData }: any) {
    const handleChanges = () => {
        console.log("Changes saved");
        console.log(userData)
    }
    return (
      <>
        <Dialog open={true} onOpenChange={onClose}>
          <DialogTrigger>Open</DialogTrigger>
          <div className="dark">
              <DialogContent className="sm:max-w-[425px] bg-foregroundDark dark:bg-foregroundDark">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to users profiles here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      defaultValue={userData?.name}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="surname" className="text-right">
                      Surname
                    </Label>
                    <Input
                      id="surname"
                      defaultValue={userData?.surname}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      defaultValue={userData?.email}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="address" className="text-right">
                      Address
                    </Label>
                    <Input
                      id="address"
                      defaultValue={userData?.address}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">
                      Role
                    </Label>
                    <Input
                      id="role"
                      defaultValue={userData?.role}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="createdAt" className="text-right">
                      Created At
                    </Label>
                    <Input
                      id="createdAt"
                      defaultValue={userData?.createdAt}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleChanges} type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
          </div>
        </Dialog>
      </>
    );
  }
  
  export default Modal;
  