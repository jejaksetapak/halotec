import React, { Component } from 'react'
import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';
import NavbarComponent from '../component/NavbarComponent';
import FormDetailPage from '../page/FormDetailPage';
import HomePage from '../page/HomePage';


export default class ConfigRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <NavbarComponent />
                <main className='main-content'>
                    <Routes>
                    <Route path='/' element={<HomePage/>} exact />
                    <Route path='/form-detail/:id' element={<FormDetailPage/>}/>
                    </Routes>
                </main>
            </BrowserRouter>
        )
    }
}