import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from "./App";
import settingsSlices from './Components/SettingsSlices';
import {configureStore} from "@reduxjs/toolkit";
import {Provider} from "react-redux";


const store = configureStore({
    reducer: {
        settings: settingsSlices.reducer
    }
})

const Footer = () => (

    <footer style={{textAlign: 'center', display: 'flex', justifyContent: 'space-between'}}>
        <div>
            Created by <a href="https://github.com/dispet">dispet</a> ©2021
        </div>
        <div>
            <a href="https://rs.school/">
                <img src="https://app.rs.school/static/images/logo-rsschool3.png" alt="rs.school" width="60px"/>
            </a>
        </div>
    </footer>
);
ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/><Footer/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);
