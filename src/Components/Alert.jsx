import React from 'react'
import PropTypes from 'prop-types'

export default function Alert({ success = "False",
    alertText = "",
    additionalMSG = ""
}) {

    return (
        <>
            <div id="Alert" className={`flex flex-col justify-center items-center text-md p-2 ${success === "True" ? "text-blue-500" : "text-red-500"} `} role="alert">
                <span className=' hover:scale-90 hover:cursor-pointer transition-all '>{alertText}</span>
                <span className=' hover:scale-90 hover:cursor-pointer transition-all text-yellow-500'>{additionalMSG}</span>
            </div>
        </>
    )
}


Alert.prototypes = {
    success: PropTypes.string.isRequired,
    alertText: PropTypes.string.isRequired,
    additionalMSG: PropTypes.string
}
