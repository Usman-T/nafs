import { logout } from "@/lib/actions";
import { LogOutIcon } from "lucide-react";

const SignOutButton = () => {
  return (
      <form action={logout}>
        <button
          type="submit"
          className="w-full flex items-center text-red-500 hover:bg-dark-bg2 hover:text-red-400 px-2 py-1 text-sm"
        >
          <LogOutIcon className="mr-2 h-4 w-4" /> Log out
        </button>
      </form>
  );
};

export default SignOutButton;
