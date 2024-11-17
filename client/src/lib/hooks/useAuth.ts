// "use client";
// import { useEffect, useState } from "react";
// import { getTokenInfo } from "../getTokenInfo";
// import { set } from "lodash";

// function useAuth() {
//   const [tokenUser, setTokenUser] = useState({
//     _id: "",
//     email: "",
//     firstName: "",
//     emailVerified: false,
//     isSubscribed: false,
//     subscribedPlan: "",
//   });
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     setIsLoading(true);
//     const catchData = async () => {
//       const user = await getTokenInfo();
//       console.log("user", user);
//       if (user) {
//         setTokenUser({
//           ...tokenUser,
//           _id: user._id,
//           email: user.email,
//           firstName: user.firstName,
//           emailVerified: user.emailVerified,
//           isSubscribed: user.isSubscribed,
//           subscribedPlan: user.subscribedPlan,
//         });
//       }
//       setIsLoading(false);
//     };

//     catchData();
//   }, []);

//   return { tokenUser, isLoading };
// }

// export default useAuth;

"use client";

import { useEffect, useState } from "react";
import { getTokenInfo } from "../getTokenInfo";
import type { User } from "../getTokenInfo";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isSubscribed = true;

    const fetchUserData = async () => {
      try {
        const userData = await getTokenInfo();

        if (!isSubscribed) return;

        if (userData) {
          setAuthState({
            user: userData,
            isLoading: false,
            error: null,
          });
        } else {
          setAuthState({
            user: null,
            isLoading: false,
            error: null,
          });
        }
      } catch (error) {
        if (!isSubscribed) return;

        setAuthState({
          user: null,
          isLoading: false,
          error:
            error instanceof Error
              ? error.message
              : "Failed to fetch user data",
        });
      }
    };

    fetchUserData();

    return () => {
      isSubscribed = false;
    };
  }, []);

  return {
    user: authState.user,
    isLoading: authState.isLoading,
    error: authState.error,
    isAuthenticated: Boolean(authState.user),
  };
}

export default useAuth;
