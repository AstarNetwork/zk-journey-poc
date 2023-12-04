import React, {createContext, useCallback, useContext, useMemo, useState} from "react";
import SignatureModal from "~/components/SignatureModal";

interface SignatureContextType {
    signature: string;
    updateSignature: (signature: string) => void
}

export const SignatureContext = createContext<SignatureContextType>(
    {
        signature: "",
        updateSignature: () => null
    }
);

interface BanditContextProps {
    children: React.ReactNode
}

export const SignatureContextProvider: React.FC<BanditContextProps> = ({children}) => {
    const [signature, setSignature] = useState("")

    const updateSignature = useCallback((signature: string) => {
        setSignature(signature)
    }, [setSignature])

    const value = useMemo(() => {
        return {signature, updateSignature};
    }, [signature, updateSignature]);

    return (
        <SignatureContext.Provider value={value}>
            {children}
            <SignatureModal/>
        </SignatureContext.Provider>
    );
};

export const useSignatureContext = (): SignatureContextType =>
    useContext(SignatureContext);
