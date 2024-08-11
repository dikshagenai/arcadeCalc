import React, { useState } from 'react'
import Alert from "./Alert"
import LastUpdated from './LastUpdated'

const Calculate = () => {

    // -------------------------------- FOR THE OUTPUT/ALERT COMPONENT
    const [alert, setAlert] = useState({
        "success": "False",
        "alertText": "‎",
        "additionalMSG": '‎'
    })

    const showAlert = (message, success, additionalMSG = '') => {
        setAlert({
            "success": success,
            "alertText": message,
            "additionalMSG": additionalMSG
        })
    }



    // ---------------------------------- SOME USE STATES
    const [calculateText, setCalculateText] = useState("Calculate Points") // for the button text
    const [publicUrl, setPublicUrl] = useState("") // for the public url ( so can be easily used to get url)
    const [detailedOutput, setDetailedOutput] = useState(false) // to make its value true or false based on the thing either data extracted or not
    const [detailedOutputJSON, setDetailedOutputJSON] = useState('') // giving it detailed JSON object

    // function to change the value in the text box too 
    const onChange = (e) => {
        if (calculateText === 'Calculating Points...') {
            return
        }
        setPublicUrl(e.target.value);
        showAlert("‎", "False", "‎");
        setDetailedOutput(false)
    }

    // ------------------------------- THis function can open json in new tab 
    const showJsonInNewTab = (jsonObject) => {
        const jsonString = JSON.stringify(jsonObject, null, 2);
        const newWindow = window.open();
        newWindow.document.write(`<pre>${jsonString}</pre>`);
        newWindow.document.close();
    };


    // ------------------------- Function to calculate the points
    const calculatePoints = async () => {

        // below 2 lines to make sure about not showing more information without response 
        showAlert("‎", "False", "‎");
        setDetailedOutput(false)

        // function starts here!
        setCalculateText("Calculating Points...")
        let tempMessage = '';

        // to avoid invalid url making issues
        if (!publicUrl.includes("https://www.cloudskillsboost.google/public_profiles/")) {
            showAlert("Please provide a valid Url.", "False")
            setCalculateText("Calculate Points")
            return
        }
        else if (publicUrl === '') {
            showAlert("Please enter a valid url", "False")
            setCalculateText("Calculate Points")
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
                setCalculateText("Calculate Points")
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
        setCalculateText("Calculate Points")
    }
    return (
        <>
            <div className="mt-3 p-3 sm:p-6 rounded shadow-lg border border-gray-200 max-w-md w-5/6 sm:w-full mx-auto bg-black hover:ring-pink-400 hover:ring-2 hover:ring-inset">
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 ">
                        <span className="text-blue-500">G</span>
                        <span className="text-red-500">o</span>
                        <span className="text-yellow-500">o</span>
                        <span className="text-blue-500">g</span>
                        <span className="text-green-500">l</span>
                        <span className="text-red-500">e</span>
                        <span className="text-white ml-2">Cloud</span>
                    </h1>
                    <h2 className="text-sm font-semibold text-white">Facilitator '24</h2>
                    <h3 className="mb-1 text-xl text-yellow-500 mt-2 font-bold press-start-2p-regular">Points Calculator</h3>
                </div>

                {/* Calculate Text if equals to 'Calculate Points' means no search is going... allow user else not */}
                <input className={`border p-2 rounded w-full my-2 hover:${calculateText === 'Calculate Points' ? '' : 'cursor-wait'}`} placeholder="Enter your public profile URL" type="text" name='publicUrl' value={publicUrl} onChange={onChange} />

                <button className={`bg-blue-500 hover:bg-blue-400 hover:translate-y-px text-white px-4 py-2 rounded w-full hover:${calculateText === 'Calculate Points' ? '' : 'cursor-no-drop'}`} onClick={calculatePoints}>{calculateText}</button>


                <button className={`bg-green-500 text-white px-4 py-2 my-2 rounded w-full hover:bg-green-400 hover:translate-y-px ${detailedOutput === true ? '' : "hidden"}`} onClick={() => { showJsonInNewTab(detailedOutputJSON) }}>Show Detailed Output</button>

                <Alert success={alert["success"]} alertText={alert["alertText"]} additionalMSG={alert["additionalMSG"]} />

                <div className="mb-2 text-white">
                    <p>
                        <strong>NOTE: </strong>
                        <span>If you have joined under any Facilitator, then consider the <strong className='italic'>Facilitator Points</strong>; otherwise, consider the <strong className='italic'>Arcade Points</strong>.</span>
                    </p>
                </div>
                <LastUpdated />

            </div>
        </>
    )
}

export default Calculate;
