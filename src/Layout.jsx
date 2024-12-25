import { useUser } from "@clerk/clerk-react";
import { NavHeader } from "./header/NavHeader";
import { DetailsForm } from "./mainForms/DetailsForm";

export const Layout = () => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col h-screen ">
      <NavHeader />
      <div className="bg-slate-200 h-screen ">
        {isSignedIn && <DetailsForm />}
      </div>
    </div>
  );
};
