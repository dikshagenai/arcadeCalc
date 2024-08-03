import React from 'react'
import PropTypes from 'prop-types'

export default function Alert(props) {

    return (
        <>
            <div id="Alert" className={`flex justify-center text-xl p-2 ${props.success === "True" ? "text-blue-500" : "text-red-500"} `} role="alert">
                {props.alertText}
            </div>
        </>
    )
}


Alert.prototypes = {
    success: PropTypes.string.isRequired,
    alertText: PropTypes.string.isRequired
}

Alert.defaultProps = {
    success: "False",
    alertText: ""
}