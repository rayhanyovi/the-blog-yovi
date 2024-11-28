import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { QueryClient, QueryClientProvider } from "react-query";
import type { AppProps } from "next/app";
import { ConfigProvider, theme } from "antd";
import { useState, useEffect } from "react";
import { ThemeContext } from "@/contexts/themeContexts";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode) {
      setIsDark(savedMode === "true");
      if (savedMode === "true") {
        document.documentElement.classList.add("dark");
      }
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <ConfigProvider
          theme={{
            algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
          }}
        >
          <Analytics />
          <Component {...pageProps} />
        </ConfigProvider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}
