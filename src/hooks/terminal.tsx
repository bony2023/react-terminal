import * as React from "react";

import Utils from "../common/Utils";

export const useClickOutsideEvent = (ref: any, clickedInside: boolean, setClickedInside: any) => {
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setClickedInside(false);
    } else if (Utils.isMobile()) {
        setClickedInside(!clickedInside);
    } else {
      setClickedInside(true);
    }
  };

  React.useEffect(() => {
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
};

export default {
  useClickOutsideEvent
};
