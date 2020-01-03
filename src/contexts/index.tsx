import * as React from "react"
import { StyleContextProvider } from "./StyleContext"


export default function ContextProvider(props: any) {
    return (
        <StyleContextProvider>
            {props.children}
        </StyleContextProvider>
    )
}