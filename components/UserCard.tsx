"use client";
import { User } from "@/types/admin";
import { LucideMails, User2, UserCogIcon, UserMinus2 } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { InfoEditCard } from "./InfoEditCard";
interface UserCardProps {
  user: User;
  logedInUser: string;
}

export const UserCard: React.FC<UserCardProps> = ({ user, logedInUser }) => {
  const handleDelete = async ({
    id,
    isCurrentUser,
  }: {
    id: string;
    isCurrentUser: boolean;
  }) => {
    try {
      const response = await fetch(`/api/auth/delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) throw new Error(response.statusText);

      const data = await response.json();
      if (data.success) {
        if (isCurrentUser) {
          await fetch("/api/auth/delete");
        }
        toast.success(data.message);
        window.location.reload();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("something Went Wrong");
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-lg p-6 shadow-lg hover:shadow-xl relative transition-shadow duration-300">
      {logedInUser === user.email && (
        <Button
          variant={"ghost"}
          className="absolute top-2 right-2"
          size={"sm"}
        >
          <User2 className="text-primary" /> You
        </Button>
      )}

      <h2 className="text-xl font-semibold mb-2 text-center border-b">
        {user.name}
      </h2>

      <p className="text-gray-600 text-lg mt-3 flex items-center gap-1">
        {" "}
        <LucideMails className="inline-block text-primary" />
        {user.email}
      </p>
      <div className="mt-4 flex items-center gap-x-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"} variant={"outline"}>
              <UserCogIcon /> Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-center">Edit Your Info</DialogTitle>
              <DialogDescription className="text-center">
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            {/* card */}
            <InfoEditCard user={user} />
            {/* card */}
            <DialogFooter></DialogFooter>
          </DialogContent>
        </Dialog>

        <Button
          onClick={() => {
            handleDelete({
              id: user._id,
              isCurrentUser: logedInUser === user.email,
            });
          }}
          size={"sm"}
          variant={"destructive"}
        >
          <UserMinus2 /> Delete
        </Button>
      </div>
    </div>
  );
};
