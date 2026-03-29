import { useState } from "react"
import { toast } from "react-toastify"
import { getEnhancedPrompt, generateImage } from "../utils/apiHelpers.js"
import { TailSpin } from "react-loader-spinner"

const WorkflowText = () => {


    const [userPrompt, setUserPrompt] = useState('')

    const [enhancedPrompt, setEnhancedPrompt] = useState('')

    const [imageUrl, setImageUrl] = useState('')

    const [isLoading, setIsLoading] = useState(false)





    const onClickStartAgain = () => {
        setUserPrompt('')
        setEnhancedPrompt('')
        setImageUrl('')
        setIsLoading('')
    }

    const onClickOnEnhancePrompt = async () => {
        setIsLoading(true)
        console.log(userPrompt)
        if (!userPrompt) {
            setIsLoading(false)
            return toast.error("Please enter valid user prompt")
        }
        const result = await getEnhancedPrompt(userPrompt)
        console.log(result)
        setEnhancedPrompt(result)
        toast.success("Enhance prompt is generated.")
        setIsLoading(false)
    }


    const onClickOnGenerateImage = async () => {
        setIsLoading(true)
        if (!enhancedPrompt) {
            setIsLoading(false)
            return toast.error("Please enter valid enhanced prompt")
        }
        const imageUrl = await generateImage(enhancedPrompt)
        //console.log(imageUrl)

        setImageUrl(imageUrl)
        toast.success("Image is generated successfully.")

        setIsLoading(false)
    }




    const onRenderLoader = () => {
        return (
            <div className="flex flex-col min-h-screen justify-center items-center">

                <TailSpin width={40} height={40} color="blue" />

            </div>
        )
    }




    const onRenderImage = () => {
        return (
            <div className="w-full px-6 py-6 my-5  sm:w-[50%] bg-white shadow-md rounded-xl ">

                <h1 className="text-md sm:text-xl font-bold text-gray-700 text-center">Creative Studio AI Enhanced Prompt</h1>

                <p className="text-gray-400 my-3 text-sm">{enhancedPrompt}</p>
                <img src={imageUrl} alt="pear media" />
                <div className="flex justify-center my-10 ">
                    <button onClick={onClickStartAgain} type="button" className="text-white bg-indigo-600 hover:bg-indigo-700 text-xs px-5 py-2 rounded-md sm:text-sm font-semibold cursor-pointer ">Start  Again </button>



                </div>

            </div>

        )
    }


    const onRenderEnhancePrompt = () => {
        return (
            <div className="w-full px-6 py-6 my-5  sm:w-[50%] bg-white shadow-md rounded-xl ">

                <h1 className="text-md sm:text-xl font-bold text-gray-700 text-center">Creative Studio AI Enhanced Prompt</h1>
                <div className="my-5">
                    <textarea value={enhancedPrompt} onChange={(e) => setEnhancedPrompt(e.target.value)} placeholder="A luxury car parked in a studio environment...." className="border w-full rounded-xl p-4 outline-none border-gray-500 text-md font-semibold text-gray-600 " rows="3"   >


                    </textarea>
                    <div className="flex justify-end my-2">
                        <button onClick={onClickOnGenerateImage} type="button" className="text-white bg-indigo-600 hover:bg-indigo-700 text-xs px-5 py-2 rounded-md sm:text-sm font-semibold cursor-pointer ">Generate Image </button>
                    </div>
                </div>

            </div>

        )
    }


    const onRenderCreateStudio = () => {
        return (
            <div className="w-full px-6 py-6 my-5  sm:w-[50%] bg-white shadow-md rounded-xl ">

                <h1 className="text-md sm:text-xl font-bold text-gray-700 text-center">Creative Studio AI Image Generated</h1>
                <div className="my-5">
                    <textarea value={userPrompt} onChange={(e) => setUserPrompt(e.target.value)} placeholder="A luxury car parked in a studio environment...." className="border w-full rounded-xl p-4 outline-none border-gray-500 text-md font-semibold text-gray-600 " rows="3"   >


                    </textarea>
                    <div className="flex justify-end my-2">
                        <button onClick={onClickOnEnhancePrompt} type="button" className="text-white bg-indigo-600 hover:bg-indigo-700 text-xs px-5 py-2 rounded-md sm:text-sm font-semibold cursor-pointer ">Enhance Prompt </button>
                    </div>
                </div>

            </div>

        )
    }


    const onRenderResult = () => {

        return (
            <div className="w-full">
                <div className="flex justify-center">

                    {onRenderCreateStudio()}
                </div>

                <div className="flex justify-center">
                    {
                        enhancedPrompt !== "" && onRenderEnhancePrompt()}
                </div>
                <div className="flex justify-center">
                    {imageUrl !== "" && onRenderImage()}
                </div>



            </div>
        )
    }


    return (
        <>
            {
                isLoading ? onRenderLoader() : onRenderResult()
            }
        </>
    )
}


export default WorkflowText