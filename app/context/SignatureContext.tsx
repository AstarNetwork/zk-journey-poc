import React from "react";
import SignatureModal from "~/components/SignatureModal";
import {useLocation} from '@remix-run/react'
interface SignatureContextProps {
    children: React.ReactNode
}

export const SignatureContextProvider: React.FC<SignatureContextProps> = ({children}) => {
    const {pathname} = useLocation()

    return (
        <>
            {children}
            {pathname === "/countryside" &&<SignatureModal/>}
        </>
    );
};
