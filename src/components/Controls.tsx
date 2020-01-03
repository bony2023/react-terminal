import * as React from 'react'
import { StyleContext } from "../contexts/StyleContext"


export default function Controls(props: any) {
    const style = React.useContext(StyleContext)

    let controls = props.controls.map((control: string, index: number) => {
        return (
            <div key={index} className={`${style.consoleCtrl} ${style[control]}`}></div>
        )
    })

    return (
        <div className={style.controls}>
            {controls}
        </div>
    )
}

Controls.defaultProps = {
    controls: ["close", "minimize", "maximize"]
}