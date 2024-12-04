// `app/users/page.tsx` for server components:
import { UserCard } from "@/components/UserCard";
import { verifyToken } from "@/lib/jwt";
import { UsersResponse } from "@/types/admin";
import { cookies } from "next/headers";

async function fetchUsers(): Promise<UsersResponse> {
  const res = await fetch(`${process.env.PUBLIC_URL}/api/auth/get-all`, {
    cache: "no-store", // To ensure it fetches fresh data
  });
  return res.json();
}

export default async function UsersPage() {
  const data = await fetchUsers();
  const token = (await cookies()).get("token")?.value;
  const tokanData = verifyToken(token);
  return (
    <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {data.success ? (
        data.admins.map((user) => (
          <UserCard logedInUser={tokanData?.email} key={user._id} user={user} />
        ))
      ) : (
        <p>No Users Found</p>
      )}
    </div>
  );
}
