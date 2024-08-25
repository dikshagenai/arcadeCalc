import React, { useEffect, useRef, useState } from 'react'
import Alert from "./Alert"
import LastUpdated from './LastUpdated'
import { FaArrowLeft } from "react-icons/fa6";
import milestoneJson from '../assets/Milestones.json'
import { motion } from 'framer-motion';

const Calculate = () => {

    // ---------------------------------- Ref about the 2 components ---> Calculate Points and Detailed Output
    const calculatePointsRef = useRef(null)
    const detailedOutputRef = useRef(null)

    const inputTextBox = useRef(null)

    useEffect(() => {
        if (window.innerWidth > 760) {
            inputTextBox.current.focus()
        }
    }, [])


    // -------------------------------- FOR THE OUTPUT/ALERT COMPONENT
    const [alert, setAlert] = useState({
        "success": "False",
        "alertText": "‎",
        "additionalMSG": '‎'
    })

    const showAlert = (message, success, additionalMSG = '‎') => {
        setAlert({
            "success": success,
            "alertText": message,
            "additionalMSG": additionalMSG
        })
    }



    // ---------------------------------- SOME USE STATES
    const [publicUrl, setPublicUrl] = useState("") // for the public url ( so can be easily used to get url)
    const [detailedOutput, setDetailedOutput] = useState(false) // to make its value true or false based on the thing either data extracted or not
    const [detailedOutputJSON, setDetailedOutputJSON] = useState('') // giving it detailed JSON object
    const [isCalculating, setIsCalculating] = useState(false) // will be used for basic logic for checking calculating status
    const [isClickedDetailedOutput, setIsClickedDetailedOutput] = useState(false); // to track the click
    const [percentageProgressJson, SetPercentageProgressJson] = useState({}) // For the percentage in each element ( this is going to be used in the detailed output )


    // function to change the value in the text box too 
    const onChange = (e) => {
        if (isCalculating) {
            return
        }
        setPublicUrl(e.target.value);
        showAlert("‎", "False", "‎");
        setDetailedOutput(false)
        setIsClickedDetailedOutput(false)
    }

    // ------------------------------- MAKING USER ABLE TO CLICK THE BUTTON WHILE STAYING IN THE TEXT BOX

    const buttonRef = useRef(null)
    const handleClickEventFromText = (e) => {
        if (e.key === "Enter") {
            buttonRef.current.click()
        }
    }

    // ---------------------------- Function to reset everything means go back to the main part to calculate points
    const resetEverything = () => {
        setIsClickedDetailedOutput(false)
        calculatePointsRef.current.style.display = 'block';
        detailedOutputRef.current.style.display = 'none';
    }


    // ------------------------------- THis function can open json in new tab 
    const showJsonInNewTab = (jsonObject) => {

        setIsClickedDetailedOutput(true)


        // to hide some portion of the calculating part...
        calculatePointsRef.current.style.display = 'none';
        detailedOutputRef.current.style.display = 'block';


        let tempJson = {}

        Object.entries(milestoneJson).map(([milestoneName, milestoneData]) => {
            tempJson[milestoneName] = (
                (detailedOutputJSON['FacilitatorStatus']['Game Badges'] >= milestoneData['gameBadges'] ? milestoneData['gameBadges'] : detailedOutputJSON['FacilitatorStatus']['Game Badges']) +
                (detailedOutputJSON['FacilitatorStatus']['Trivia Badges'] >= milestoneData['triviaBadges'] ? milestoneData['triviaBadges'] : detailedOutputJSON['FacilitatorStatus']['Trivia Badges']) +
                (detailedOutputJSON['FacilitatorStatus']['Skill Badges'] >= milestoneData['skillBadges'] ? milestoneData['skillBadges'] : detailedOutputJSON['FacilitatorStatus']['Skill Badges'])
            )
            return "None"
        })

        SetPercentageProgressJson(tempJson) // Our Json file got the number of points from each milestone now it will be easy to calculate percentage... hehehe

        // const jsonString = JSON.stringify(jsonObject, null, 2);
        // const newWindow = window.open();
        // newWindow.document.write(`<pre>${jsonString}</pre>`);
        // newWindow.document.close();
    };


    // ------------------------- Function to calculate the points
    const calculatePoints = async () => {

        // below 2 lines to make sure about not showing more information without response 
        showAlert("‎", "False", "‎");
        setDetailedOutput(false)

        // function starts here!
        setIsCalculating(true) // yes it is calculating points...
        let tempMessage = '';

        // to avoid invalid url making issues
        if (!publicUrl.includes("https://www.cloudskillsboost.google/public_profiles/")) {
            showAlert("Please provide a valid Url.", "False")
            setIsCalculating(false) // it is not calculating anything now!
            return
        }
        else if (publicUrl === '') {
            showAlert("Please enter a valid url", "False")
            setIsCalculating(false) // no i am not calculating
            return
        }
        else {
            // interacting with the api
            try {
                // to avoid any kind of error
                // const BASE_URL = 'http://localhost:5000'
                const BASE_URL = 'https://arcadecalc.onrender.com'
                var response = await fetch(`${BASE_URL}/calculate`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ publicUrl })
                    })
            } catch (error) {
                showAlert("Please check your internet connection.", "False")
                setIsCalculating(false) // not calculating now!
                return
            }

        }

        let result = await response.json()
        setDetailedOutputJSON(result['result']['data']) // giving out selected information as output 


        if (response.status === 200) {
            // console.log(result)
            tempMessage = result['result']['data']['totalPoints']

            let facilitatorPoints = result['result']['data']['totalPointsFacilitator'] // & for the Facilitator Points 

            showAlert(`Arcade Points: ${tempMessage}`, "True",
                `Facilitator Points: ${facilitatorPoints}`)
            setDetailedOutput(true); // code works fine and we can show detailed json
        }

        else {
            // FOR ANY CASE CODE SHOWS ERROR SO, MAKING IT TO SHOW THE ERROR MESSAGE.
            tempMessage = result['result']['message']
            showAlert(tempMessage, "False")

        }
        setIsCalculating(false) // not calculating...
    }







    return (
        <>
            <div className="font-mono my-3 p-4 px-6 sm:p-6 rounded-xl shadow-lg border border-gray-200 max-w-md w-5/6 sm:w-full mx-auto bg-black hover:bg-gray-900 transition-all duration-300">

                {/* SHOW THIS PART WHILE CALCULATING THE POINTS.... */}
                <div ref={calculatePointsRef}>
                    <div className="text-center mb-2 select-none">
                        <h1 className="text-xl font-bold text-gray-900 ">
                            <span className="text-blue-500">G</span>
                            <span className="text-red-500">o</span>
                            <span className="text-yellow-500">o</span>
                            <span className="text-blue-500">g</span>
                            <span className="text-green-500">l</span>
                            <span className="text-red-500">e</span>
                            <span className="text-white ml-2">Cloud</span>
                        </h1>
                        <h2 className="text-sm font-semibold text-white">Facilitator '24</h2>
                        <h3 className="mb-1 text-sm sm:text-md text-yellow-500 mt-2 font-bold press-start-2p-regular">Points Calculator</h3>
                    </div>




                    {/* Calculate Text if equals to 'Calculate Points' means no search is going... allow user else not */}
                    <input ref={inputTextBox} className={`outline-none  p-2 rounded w-full my-2 hover:${isCalculating && 'cursor-wait'}`} placeholder="Enter your public profile URL" type="text" name='publicUrl' value={publicUrl} onChange={onChange} onKeyDown={handleClickEventFromText} />

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`bg-blue-500 hover:bg-blue-400 text-white px-4 py-2 rounded w-full hover:${isCalculating && 'cursor-no-drop'}`} onClick={calculatePoints} ref={buttonRef}>

                        {/* Below is a ternary operation which make sure to show what type of text */}
                        {
                            isCalculating ? <>
                                {/* SHOW WHEN CALCULATING  */}
                                <div className='flex justify-center items-center'>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    <span className='text-sm sm:text-lg'>Processing...</span>
                                </div>
                            </>
                                : <>
                                    {/* SHOW WHEN NOT CALCULATING  */}
                                    <div className='flex justify-center items-center'>
                                        <span className='text-sm sm:text-lg'>Calculate Points</span>
                                    </div>
                                </>
                        }
                    </motion.button >

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`bg-green-500 text-white px-4 py-2 my-2 rounded w-full hover:bg-green-400  ${detailedOutput === true ? '' : "hidden"}`} onClick={() => { showJsonInNewTab(detailedOutputJSON) }}>Show Detailed Output</motion.button>



                    <Alert success={alert["success"]} alertText={alert["alertText"]} additionalMSG={alert["additionalMSG"]} />
                </div>




                {/* SHOW THIS PART WHILE USER CHOOSE TO SEE DETAILED OUTPUT */}
                <div className={`${!isClickedDetailedOutput && "hidden"}`} ref={detailedOutputRef}>




                    {/* DIV FOR THE TEXT BOX */}
                    <div className="text-xs sm:text-sm overflow-hidden max-h-64 my-1 rounded-lg bg-pink-500 w-full scrollbar scrollbar-thumb-gray-900 scrollbar-track-gray-100 custom-scrollbar">

                        <div className="py-1 flex justify-center items-center"><strong className='text-white text-lg sm:text-xl'>Progress Report</strong></div>

                        <table className="table-auto w-full bg-white">
                            <thead>
                                <tr className='border border-black bg-blue-500 text-white'>
                                    <th>Badge</th>
                                    <th>Completions</th>
                                </tr>
                            </thead>

                            <tbody className='p-2'>
                                <tr className='border border-black'>
                                    <td className='text-center py-1 border-r border-black hover:text-red-500 hover:cursor-pointer hover:-translate-y-px transition-all hover:scale-95 '>Game Badges </td>
                                    <td className='text-center py-1 hover:text-red-500 hover:cursor-pointer hover:-translate-y-px transition-all hover:scale-95 '>{isClickedDetailedOutput ? detailedOutputJSON['FacilitatorStatus']['Game Badges'] : 'None'}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='text-center py-1 border-r border-black hover:text-red-500 hover:cursor-pointer hover:-translate-y-px transition-all hover:scale-95 '>Trivia Badges </td>
                                    <td className='text-center py-1 hover:text-red-500 hover:cursor-pointer hover:-translate-y-px transition-all hover:scale-95 '>{isClickedDetailedOutput ? detailedOutputJSON['FacilitatorStatus']['Trivia Badges'] : 'None'}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='text-center py-1 border-r border-black hover:text-red-500 hover:cursor-pointer hover:-translate-y-px transition-all hover:scale-95 '>Skill Badges </td>
                                    <td className='text-center py-1 hover:text-red-500 hover:cursor-pointer hover:-translate-y-px transition-all hover:scale-95 '>{isClickedDetailedOutput ? detailedOutputJSON['FacilitatorStatus']['Skill Badges'] : 'None'}</td>
                                </tr>
                                <tr className='border border-black'>
                                    <td className='text-center py-1 border-r border-black hover:text-red-500 hover:cursor-pointer hover:-translate-y-px transition-all hover:scale-95 '>Milestone Earned </td>
                                    <motion.td
                                        initial={{ opacity: 0, scale: 1.2 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 1 }}
                                        className='text-center py-1 bg-green-500 text-white hover:cursor-pointer transition-all '>{isClickedDetailedOutput ? detailedOutputJSON['FacilitatorStatus']['Milestone Earned'] : 'None'}</motion.td>
                                </tr>
                            </tbody>
                        </table>
                    </div>



                    {/* THis div is for the main part means it contains the whole part.. */}
                    <hr className='h-px bg-gray-300 my-2' />
                    <div className="mt-1 overflow-y-auto max-h-80">
                        {/* this div contains children which are of 4 div m1, m2, m3, m4 */}

                        <div className="overflow-y-auto max-h-48">


                            {/* below div is just to fix some classes error because they are dynamically generated and in the process of converting output.css they won't be extracted!  */}
                            <div className="text-yellow-600 bg-yellow-500 bg-yellow-200
                                            text-green-600 bg-green-500 bg-green-200
                                            text-blue-600 bg-blue-500 bg-blue-200
                                            text-red-600 bg-red-500 bg-red-200 hidden">
                            </div>


                            {Object.entries(milestoneJson).map(([milestoneName, milestoneData]) => {

                                // ! This is the repeated Element

                                return (<div className="p-2 my-1 rounded-md sm:rounded-lg bg-white w-full border border-black " key={milestoneName} >
                                    <span><strong className={`text-${milestoneData["themeColor"]}-500`}>{milestoneData['milestoneName']}</strong>
                                        <div className='hidden sm:block'>{milestoneData['milestoneRequirements']}</div>
                                    </span>


                                    <div className={` text-xs font-semibold flex sm:justify-end justify-center items-center py-1 mx-3`}>
                                        <span className={`${(
                                            percentageProgressJson[milestoneName] / milestoneData['requiredPoints'] * 100).toFixed(2) === '100.00' && 'animate-bounce'}
                                        rounded p-2 text-${milestoneData['themeColor']}-600 bg-${milestoneData['themeColor']}-200 `}>+{milestoneData['rewardedPoints']} Points</span>
                                    </div>


                                    {/* Contains information about the ARcade2/2 Game: 2/2 Skill 2/2 etc. like this */}
                                    <div className=' w-full flex flex-wrap  justify-between items-center my-1'>
                                        <div className='flex flex-wrap px-2 gap-1'>
                                            <p className='font-medium sm:font-semibold'>Arcade: </p>
                                            {/* LINE BELOW MAKE SURE THAT IF THE MILESTONE DEMANDS 2 POINTS, IT SHOWS 2 AND NOT GREATER THAN 2 */}

                                            <span>{isClickedDetailedOutput ? (
                                                detailedOutputJSON['FacilitatorStatus']['Game Badges'] >= milestoneData['gameBadges'] ? milestoneData['gameBadges'] : detailedOutputJSON['FacilitatorStatus']['Game Badges']
                                            ) : 0}
                                            </span>

                                            <span>/{milestoneData['gameBadges']}</span>
                                        </div>
                                        <div className='flex flex-wrap px-2 gap-1'>
                                            <p className='font-medium sm:font-semibold'>Trivia: </p>
                                            {/* LINE BELOW MAKE SURE THAT IF THE MILESTONE DEMANDS 2 POINTS, IT SHOWS 2 AND NOT GREATER THAN 2 */}

                                            <span>{isClickedDetailedOutput ? (
                                                detailedOutputJSON['FacilitatorStatus']['Trivia Badges'] >= milestoneData['triviaBadges'] ? milestoneData['triviaBadges'] : detailedOutputJSON['FacilitatorStatus']['Trivia Badges']
                                            ) : 0}
                                            </span>

                                            <span>/{milestoneData['triviaBadges']}</span>
                                        </div>
                                        <div className='flex flex-wrap px-2 gap-1'>
                                            <p className='font-medium sm:font-semibold'>Skill: </p>
                                            {/* LINE BELOW MAKE SURE THAT IF THE MILESTONE DEMANDS 2 POINTS, IT SHOWS 2 AND NOT GREATER THAN 2 */}

                                            <span>{isClickedDetailedOutput ? (
                                                detailedOutputJSON['FacilitatorStatus']['Skill Badges'] >= milestoneData['skillBadges'] ? milestoneData['skillBadges'] : detailedOutputJSON['FacilitatorStatus']['Skill Badges']
                                            ) : 0}
                                            </span>

                                            <span>/{milestoneData['skillBadges']}</span>
                                        </div>
                                    </div>

                                    <div className="relative mt-1">


                                        {/* Making the check about how much it has been completed!*/}
                                        <div className={`text-xs font-semibold inline-block py-1 px-2 rounded text-${milestoneData['themeColor']}-600 bg-${milestoneData['themeColor']}-200`}>
                                            {isClickedDetailedOutput ? (
                                                (percentageProgressJson[milestoneName] / milestoneData['requiredPoints'] * 100).toFixed(2)

                                            ) : '0'}% Completed!
                                        </div>

                                        <div className="mt-2 bg-gray-300 rounded-full w-full">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{
                                                    width: (isClickedDetailedOutput ? (
                                                        (percentageProgressJson[milestoneName] / milestoneData['requiredPoints'] * 100).toFixed(2) + '%'
                                                    ) : '0')
                                                }}
                                                transition={{ duration: 1 }}
                                                viewport={{ once: true }}

                                                className={`h-2 rounded-full bg-${milestoneData['themeColor']}-500`} ></motion.div>
                                        </div>
                                    </div>

                                    <div></div>
                                </div>

                                )
                            })}








                        </div>

                    </div>







                    {/* TO GO BACK */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`bg-green-500 text-white px-4 py-2 my-2 rounded w-full hover:bg-green-400`} onClick={resetEverything}>
                        <div className='flex justify-center items-center align-baseline gap-2'>
                            <FaArrowLeft />
                            <span>Go Back</span>
                        </div>
                    </motion.button>
                </div>





                {/* Footer of the card */}
                <div className="mb-2 text-white select-none">
                    <p className='text-sm'>
                        <strong>NOTE: </strong>
                        <span>If you have joined under any Facilitator, then only consider the <strong className='italic'>Facilitator Points</strong>; otherwise, consider the <strong className='italic'>Arcade Points</strong>.</span>
                    </p>
                </div>
                <LastUpdated />

            </div >
        </>
    )
}

export default Calculate;
