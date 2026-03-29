

const WorkflowText = () => {




    const onRenderCreateStudio = () => {
        return (
            <div className="w-full px-6 py-6   sm:w-[50%] bg-white shadow-md rounded-xl ">

                <h1 className="text-md sm:text-xl font-bold text-gray-700 text-center">Creative Studio AI Text Generator</h1>
                <div className="my-5">
                    <textarea placeholder="A luxury car parked in a studio environment...." className="border w-full rounded-xl p-4 outline-none border-gray-500 text-md font-semibold text-gray-600 " rows="3"   >


                    </textarea>
                    <div className="flex justify-end my-2">
                        <button type="button" className="text-white bg-indigo-600 hover:bg-indigo-700 text-xs px-5 py-2 rounded-md sm:text-sm font-semibold cursor-pointer ">Enhance Prompt </button>
                    </div>
                </div>

            </div>

        )
    }


    return onRenderCreateStudio()
}


export default WorkflowText