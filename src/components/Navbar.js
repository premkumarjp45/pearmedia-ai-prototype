import { useContext } from "react"
import MediaContext from "../context/MediaContext"
import "../App.css"

const Navbar = () => {

    const { activeTabId, setActiveTabId } = useContext(MediaContext)
    //console.log(activeTabId)
    const crClassName = activeTabId === "CREATIVE_STUDIO" ? "cursor-pointer text-sm font-semibold text-white px-3 py-1 sm:py-2 sm:px-5 bg-indigo-700 rounded-md " : "sm:py-2 sm:px-5 cursor-pointer text-sm font-semibold  px-3 py-1 text-indigo-700 rounded-xl"
    const syClassName = activeTabId === "STYLE_LAB" ? "cursor-pointer text-sm font-semibold text-white px-3 py-1 bg-indigo-700 rounded-md  sm:py-2 sm:px-5" : "sm:py-2 sm:px-5 cursor-pointer text-sm font-semibold  px-3 py-1 text-indigo-700 rounded-xl"


    return (
        <div className="flex flex-col sm:flex-row justify-between w-full  shadow-md py-5 px-4 px-10 ">
            <div className="my-2">
                <h1 className="text-md text-indigo-500 font-bold cursor-pointer">Pear Media AI</h1>
            </div>
            <div className="flex gap-10 align-items-center ">
                <button type="button" className={crClassName} onClick={() => setActiveTabId("CREATIVE_STUDIO")}  >Creative Studio</button>
                <button type="button" className={syClassName} onClick={() => setActiveTabId("STYLE_LAB")} >Style Lab</button>
            </div>
        </div>
    )
}


export default Navbar