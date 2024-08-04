import React, { useState } from 'react'
import Alert from "./Alert"
require('dotenv').config();

const Calculate = () => {

    // -------------------------------- FOR THE OUTPUT/ALERT COMPONENT
    const [alert, setAlert] = useState({
        "success": "False",
        "alertText": "‎"
    })

    const showAlert = (message, success) => {
        setAlert({
            "success": success,
            "alertText": message
        })
    }



    // ---------------------------------- SOME USE STATES
    const [calculateText, setCalculateText] = useState("Calculate Points") // for the button text
    const [publicUrl, setPublicUrl] = useState("") // for the public url ( so can be easily used to get url)
    const [detailedOutput, setDetailedOutput] = useState(false) // to make its value true or false based on the thing either data extracted or not
    const [detailedOutputJSON, setDetailedOutputJSON] = useState('') // giving it detailed JSON object

    // function to change the value in the text box too 
    const onChange = (e) => {
        setPublicUrl(e.target.value);
        showAlert("", "False")
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
            const BASE_URL = process.env.BASE_URL || 'http://localhost:5000'
            var response = await fetch(`${BASE_URL}/calculate`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ publicUrl })
                })
        }

        let result = await response.json()
        setDetailedOutputJSON(result['result']['data']) // giving out selected information as output 


        if (response.status === 200) {
            console.log(result)
            tempMessage = result['result']['data']['totalPoints']
            showAlert(`Total Points: ${tempMessage}`, "True")
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
            <div className="mt-3 p-6 rounded shadow-lg border border-gray-200 max-w-md w-full mx-auto" style={{ "backgroundColor": "white" }}>
                <div className="text-center mb-2">
                    <h1 className="text-2xl font-bold text-gray-900 ">
                        <span className="text-blue-500">G</span>
                        <span className="text-red-500">o</span>
                        <span className="text-yellow-500">o</span>
                        <span className="text-blue-500">g</span>
                        <span className="text-green-500">l</span>
                        <span className="text-red-500">e</span>
                        <span className="text-gray-400 ml-2">Cloud</span>
                    </h1>
                    <h2 className="text-sm font-semibold text-gray-600">Facilitator '24</h2>
                    <h3 className="mb-1 text-xl text-black mt-2 font-bold">Points Calculator</h3></div>


                <input className="border p-2 rounded w-full mb-4" placeholder="Enter your public profile URL" type="text" name='publicUrl' value={publicUrl} onChange={onChange}></input>
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" onClick={calculatePoints}>{calculateText}</button>


                <button className={`bg-green-500 text-white px-4 py-2 my-2 rounded w-full ${detailedOutput === true ? '' : "hidden"}`} onClick={() => { showJsonInNewTab(detailedOutputJSON) }}>Show Detailed Output</button>

                <Alert success={alert["success"]} alertText={alert["alertText"]} />
                <p className="mt-2 text-gray-500 text-xs">Last Updated: 3/8/24 5:00 PM</p>


            </div>
        </>
    )
}

export default Calculate;
