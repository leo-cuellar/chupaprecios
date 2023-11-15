import { useCallback, useEffect, useState } from "react";

export const useAuth = () => {
  const [token, setToken] = useState(localStorage.getItem("authToken"));

  const resetToken = useCallback(async () => {
    const response = await fetch(
      "https://chupaprecios.com.mx/rest/V1/integration/admin/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "candidatoFront",
          password: "Ch8t45t!f",
        }),
      }
    );
    const newToken = await response.text();
    localStorage.setItem("authToken", newToken);
    setToken(newToken.slice(1, -1));
  }, []);

  useEffect(() => {
    if (!token) {
      resetToken();
    }
  }, [token, resetToken]);

  return { token, resetToken };
};
