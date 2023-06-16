import React from "react"
import {Button} from '@mantine/core';
export default function DefaultButton ({text, onClick, props}:{text: string, props?: any, onClick?:  React.MouseEventHandler<HTMLButtonElement>}) {
    return(
        <Button {...props} onClick={onClick}
        sx={{
            color: "#000000",
            cursor: "pointer",
            fontSize: "13px",
            // display: "inline-block",
            borderRadius: "50px",
            fontWeight: "610 !important" ,
            border: "1px solid #D8D8D8",
            display: "block",
            marginLeft: "auto",
            marginRight: "auto",
            width: "150px",
            marginTop: "20px",
            marginBottom: "20px",


        }}
        >{text}</Button>
    )
}
