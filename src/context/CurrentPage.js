import {createContext, useState} from "react";

export const CurrentPageContext = createContext();

export function CurrentPageProvider({children}){
    const [page, setPage] = useState(0);

    const contextValue = {
        page,
        setPage
    }

    return (
        <CurrentPageContext.Provider value={contextValue}>
            {children}
        </CurrentPageContext.Provider>
    )
}

export default CurrentPageProvider;