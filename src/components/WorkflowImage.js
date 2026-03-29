
import { useState } from "react"
import { toast } from "react-toastify"
import { FiUpload } from "react-icons/fi";
import { analyzeImage } from "../utils/apiHelpers.js"
const WorkflowImage = () => {
    const [image, setImage] = useState('')
    const [fileBase64, setFileBase64] = useState(undefined)

    const onRenderStyledLab = () => {

        const handleFile = (e) => {

            const file = e.target.files[0]

            if (!file) {
                return
            }
            const imageUrl = URL.createObjectURL(file)
            setImage(imageUrl)

            const reader = new FileReader()
            reader.readAsDataURL(file)

            reader.onload = () => {
                const base64String = reader.result.split(",")[1]
                setFileBase64(base64String)


            }

            reader.onerror = () => {
                console.error("Error reading file")
                toast.error("Error Reading File")
            }
        }



        const onClickImageAnalysis = async () => {

            const result = await analyzeImage(fileBase64)
            console.log(result)
        }

        return (
            <div className="my-5 px-4 py-5 w-full sm:w-[50%]">

                <h1 className="text-md sm:text-xl font-bold text-gray-700 text-center text-indigo-700">StyleLab: Image Analysis & Generation</h1>
                <label htmlFor="image" className="hover:border-indigo-600 h-50 cursor-pointer my-5  border-2 text-gray-500 border-dashed rounded-xl flex flex-col justify-center items-center ">
                    {
                        image === '' ? <div className="flex flex-col items-center ">
                            <input id="image" className="text-center hidden" type="file" accept="image/*" onChange={handleFile} />
                            <FiUpload className="text-center w-10 h-10 sm:w-15 h-15" />

                            <p className="text-xs sm:text-md text-center text-gray-600 my-5 font-semibold ">Click To Upload Or Drag and Drop </p>
                        </div>
                            : <div className="w-[100%]  h-[100%]" >
                                <input id="image" className="text-center hidden" type="file" accept="image/*" onChange={handleFile} />

                                <img src={image} alt="your's uploaded Image" className="w-[100%] h-[100%] rounded-xl" />
                            </div>
                    }



                </label>


                {
                    image !== '' && <div className="my-10 text-center">
                        <button onClick={onClickImageAnalysis} type="button" className="hover:bg-indigo-700 bg-indigo-500 px-6 py-3 rounded-xl text-white font-semibold text-sm cursor-pointer ">

                            Image Analysis
                        </button>
                    </div>
                }



            </div>

        )
    }



    return onRenderStyledLab()


}


export default WorkflowImage