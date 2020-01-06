import * as React from "react";

export const useClickOutsideEvent = (ref: any, setClickedInside: any) => {
  const handleClickOutside = (event: any) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setClickedInside(false);
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
