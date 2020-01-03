import * as React from "react"
import * as style from "../index.scss"


export const StyleContext = React.createContext(null)


export const StyleContextProvider = (props: any) => {

    return (
        <StyleContext.Provider value={style.default}>
            {props.children}
        </StyleContext.Provider>
    )
}

export default {
    StyleContext,
    StyleContextProvider
}