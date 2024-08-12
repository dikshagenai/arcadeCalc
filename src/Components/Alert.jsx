import React from 'react'
import PropTypes from 'prop-types'

export default function Alert({ success = "False",
    alertText = "",
    additionalMSG = ""
}) {

    return (
        <>
            <div id="Alert" className={`flex flex-col justify-center text-md p-2 ${success === "True" ? "text-blue-500" : "text-red-500"} `} role="alert">
                <span>{alertText}</span>
                <span className='text-yellow-500'>{additionalMSG}</span>
            </div>
        </>
    )
}


Alert.prototypes = {
    success: PropTypes.string.isRequired,
    alertText: PropTypes.string.isRequired,
    additionalMSG: PropTypes.string
}
