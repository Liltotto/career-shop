import { LoginPage } from "pages/login"
import { SignUpPage } from "pages/signUp"
import { UpdateUserPage } from "pages/updateUser"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import icon from "shared/assets/RC.svg"

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <img className="main-icon" src={icon} alt="icon" />
                <Routes>
                    <Route path="/profile" element={<UpdateUserPage/>} />
                    <Route path="/register" element={<SignUpPage/>} />
                    <Route path="/login" element={<LoginPage/>} />
                    <Route path="/" element={<Navigate to="/profile" replace />} />
                </Routes>
            </div>

        </BrowserRouter>
    )
}
