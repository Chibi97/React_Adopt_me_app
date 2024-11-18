import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null); // We want to keep track of the same exact HTML element like div between renders

  if (!elRef.current) {
    elRef.current = document.createElement("div"); // Create a div once, not on every re-render
  }

  // Less performant since we always create a new div and throw away the old one (not checking the `!elRef.current`), but it works
  // const elRef2 = useRef(document.createElement("div"));

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current); // append our `div` to the `modal` element

    // We need a cleanup function to remove the `div` from the `modal` element
    // In class components, we would use `componentWillUnmount`

    // ✔️ Equivalent to componentWillUnmount is returning a function from useEffect
    return () => {
      //# Here we would also remove any event listeners, stop timers/intervals, animation frames etc.
      return modalRoot.removeChild(elRef.current);
    };
  }, []); // Run only once, onMounted

  // children, container:
  return createPortal(<div>{children}</div>, elRef.current); // inside a `div` because of CSS styling
};
export default Modal;
