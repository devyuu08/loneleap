import { useEffect, useState } from "react";
import { observeAuth } from "@/services/auth/auth";

export const useUser = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = observeAuth((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe(); // cleanup
  }, []);

  return { user };
};
