"use client"

import { useEffect, useState } from "react"
import { ProModal } from "./pro-modal";

export const ModalProvider=()=>{
    const [isMounted,setMounted]=useState(false);

    useEffect(()=>{
        setMounted(true);
    },[]);

    if(!isMounted){
        return null;
    }
    return(
        <>
        <ProModal/>
        </>
    )
};