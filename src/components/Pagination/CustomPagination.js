import React from 'react'
import Pagination from '@material-ui/lab/Pagination';
import { createTheme, ThemeProvider } from '@material-ui/core';

const darkTheme = createTheme({
    palette:{
        type: 'dark'
    }
})

const CustomPagination = ({switchPage, numberOfPages=10}) => {

    const handleSwitchingPages = (page) =>{
        switchPage(page);
        window.scroll(0,0);
    }


    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '40px' }}>
            <ThemeProvider theme={darkTheme}>
                <Pagination color='primary' count={numberOfPages} size='small' onChange={(e, page)=> handleSwitchingPages(page)}/>
            </ThemeProvider>
        </div>
    )
}

export default CustomPagination;
