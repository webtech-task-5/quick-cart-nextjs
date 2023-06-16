import React from "react"
import {Button} from '@mantine/core';
export default function DefaultButton ({text, onClick, props}:{text: string, props?: any, onClick?:  React.MouseEventHandler<HTMLButtonElement>}) {
    return(
        <Button {...props} onClick={onClick}>{text}</Button>
    )
}
