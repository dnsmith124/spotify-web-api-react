import { useEffect, useState } from "react";

/**
 * Custom React hook that tracks the current screen width.
 * @returns {number} The current screen width in pixels.
 */
export const useScreenWidth = () => {
  // Initialize the state with the current screen width.
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // Add an event listener for the `resize` event and update the state with the new screen width.
  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    // Remove the event listener when the component is unmounted.
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Return the current screen width.
  return screenWidth;
}
