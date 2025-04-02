import "@/styles/globals.css";
import type { AppProps } from "next/app";
import SubApp from "./subApp";
import { ToastProvider } from "@/hooks/ToastProvider";
import { AlertProvider } from "@/hooks/AlertProvider";
import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <SessionProvider>
        <AlertProvider>
          <ToastProvider>
            <SubApp pageProps={pageProps} Component={Component} />
          </ToastProvider>            
        </AlertProvider>      
      </SessionProvider>
    </>
  )
}

export default  App;