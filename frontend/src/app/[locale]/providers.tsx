"use client"
import { SWRConfig } from "swr"
import fetcher from "@/src/services/fetcher"

export default function Providers({children} : {children: React.ReactNode}) {
    return <SWRConfig value={{fetcher}}>{children}</SWRConfig>
}