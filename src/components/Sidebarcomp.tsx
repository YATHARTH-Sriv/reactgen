import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  PlusCircle,
  Home,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";
import { Dispatch, SetStateAction } from "react";
import Image from "next/image";

interface SidebarProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onMenuSelect: (menu: string) => void;
}

export function SidebarComponent({ open, setOpen, onMenuSelect }: SidebarProps) {
  const { data: session } = useSession();

  const menuItems = [
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: Settings, label: "Settings", key: "settings" },
    { icon: HelpCircle, label: "Help", key: "help" },
  ];

  return (
    <Sidebar className={`${open ? "w-64" : "w-16"} transition-all duration-300 bg-gray-950 border-r border-gray-800`}>
      <SidebarHeader className="p-4 relative">
        <div className={`flex items-center justify-between ${!open && "justify-center"}`}>
          <h2 className={`text-lg font-semibold text-white ${!open && "hidden"}`}>AI Visual Editor</h2>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white hover:bg-gray-800"
            onClick={() => setOpen(!open)}
          >
            {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <div className={`px-4 py-2 ${!open && "px-2"}`}>
          <Button
            className={`w-full justify-start bg-gray-800 hover:bg-gray-700 text-white border-0 ${!open && "px-2 justify-center"}`}
            variant="outline"
          >
            <PlusCircle className="h-4 w-4" />
            {open && <span className="ml-2">New Project</span>}
          </Button>
        </div>

        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.key}>
              <SidebarMenuButton
                className={`w-full flex items-center px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800 ${
                  !open && "px-2 justify-center"
                }`}
                onClick={() => onMenuSelect(item.key)}
              >
                <item.icon className="h-4 w-4" />
                {open && <span className="ml-2">{item.label}</span>}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className={`p-4 border-t border-gray-800 ${!open && "px-2"}`}>
        <div className="flex items-center">
          {session?.user?.image && (
            <Image
              src={session.user.image}
              alt="User Avatar"
              width={40}
              height={40}
              className="rounded-full"
            />
          )}
          {open && (
            <div className="ml-2">
              <p className="text-white text-sm font-medium">{session?.user?.name || "User"}</p>
              <p className="text-gray-400 text-xs">{session?.user?.email}</p>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          className={`mt-4 w-full justify-start text-gray-400 hover:text-white hover:bg-gray-800 ${
            !open && "justify-center"
          }`}
          onClick={() => signOut({ callbackUrl: "/Login" })}
        >
          <LogOut className="h-4 w-4" />
          {open && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
