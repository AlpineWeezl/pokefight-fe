import React from 'react'

const Types = ({ types }) => {
    return (
        <div>
            Types:
            {
                types.map(type => {
                    return (
                        <>
                            <div>{type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}</div>
                        </>
                    )
                }
                )
            }
        </div>
    )
}

export default Types