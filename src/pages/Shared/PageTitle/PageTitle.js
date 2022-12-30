import React from 'react'

const PageTitle = ({title}) => {

    const style = {
        'display': 'flex',
        'alignItems': 'center',
        'justifyContent': 'center',
        'width': '100%',
        'paddingBottom': '15px',
        'fontSize': '2vw',
        'letterSpacing': '2px',
        'textTransform': 'uppercase'
    }

    return <span style={style}>{title}</span>
}

export default PageTitle
