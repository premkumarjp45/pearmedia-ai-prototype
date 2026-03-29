

import { createContext, useState } from "react"


const MediaContext = createContext({})


export const MediaContextProvider = (props) => {

    const { children } = props

    const [activeTabId, setActiveTabId] = useState("CREATIVE_STUDIO")

    const [userPrompt, setUserPrompt] = useState('')


    return (
        <MediaContext.Provider value={{
            activeTabId,
            setActiveTabId,
            userPrompt,
            setUserPrompt,

        }} >

            {children}
        </MediaContext.Provider >
    )
}



export default MediaContext