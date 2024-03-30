import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type SidebarProviderProps = {
  children: ReactNode;
};

type SidebarContextType = {
  isLargeOpen: boolean;
  isSmallOpen: boolean;
  toggle: () => void;
  close: () => void;
};

const SidebarContext = createContext<SidebarContextType | null>(null);

export function useSidebarContext() {
  const value = useContext(SidebarContext);
  if (value == null) throw Error("Cannot use outside of SidebarProvider");

  return value;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isLargeOpen, setisLargeOpen] = useState(true);
  const [isSmallOpen, setisSmallOpen] = useState(false);

  useEffect(() => {
    const handler = () => {
      if (!isScreenSmall()) setisSmallOpen(false);
    };
    window.addEventListener("resize", handler);
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);

  function isScreenSmall() {
    return window.innerWidth < 1024;
  }

  function toggle() {
    if (isScreenSmall()) {
      setisSmallOpen((s) => !s);
    } else {
      setisLargeOpen((l) => !l);
    }
  }

  function close() {
    if (isScreenSmall()) {
      setisSmallOpen(false);
    } else {
      setisLargeOpen(false);
    }
  }

  return (
    <SidebarContext.Provider
      value={{
        isLargeOpen,
        isSmallOpen,
        toggle,
        close,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
