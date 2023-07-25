import React from "react";
import ThemeToggle from "../ThemeToggle/ThemeToggle";
import UserTag from "../UserTag/UserTag";
import { useDataLayerValue } from "../../DataLayer";

const SpotifyHeader = () => {
  const [{ user }] = useDataLayerValue();

  return (
    <header className="p-4 sticky top-0">
      <div className="flex justify-end ml-auto mr-auto">
        <div >
          {
            user &&
            <UserTag user={user} className="mb-2" />
          }
          <ThemeToggle className="flex justify-end"/>
        </div>
      </div>
    </header>
  )
}

export default SpotifyHeader;