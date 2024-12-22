import { AppSidebar } from "@/components/app-sidebar";
import Bread from "@/components/Bread";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="">
        <header className="flex bg-secondary h-16 shrink-0 items-center gap-2 border-b px-4 z-10">
          <SidebarTrigger className="-ml-1 " />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className=" md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className=" md:block" />
              <Bread />
            </BreadcrumbList>
          </Breadcrumb>
          <Image
            src={"/images/logo.png"}
            width={50}
            height={50}
            alt="brighthome logo"
            className="absolute top-4 object-contain md:block hidden right-4"
          />
        </header>
        <div className="bg-red- md:p-5 lg:p-10 p-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
