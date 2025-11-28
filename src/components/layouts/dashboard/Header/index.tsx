import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardHeader = () => {
  return (
    <header className="border-b">
      <div className="flex h-14 items-center justify-between px-4">
        <SidebarTrigger />

        <div className="flex items-center justify-center size-8 text-background rounded-full bg-primary">
          p
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
