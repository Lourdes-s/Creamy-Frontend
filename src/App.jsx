import React from "react"
import { Route, Routes } from "react-router-dom"
import { LoginScreen, RegisterScreen, RecoveryPasswordScreen, ForgotPasswordScreen, CreateProductScreen, ValidateMailScreen, AboutUs } from "./Screens"
import HomeScreen from "./Screens/HomeScreen"
import ProductDetailScreen from "./Screens/ProductDetailScreen"
import ProtectedRoute from "./Components/ProtectedRoute"
    const App = () => {
        return (
        <div>
            <Routes>
                <Route path="/" element={<LoginScreen/>}/>
                <Route path="/login" element={<LoginScreen/>}/>
                <Route path="/register" element={<RegisterScreen/>}/>
                <Route path="/forgot-password" element={<ForgotPasswordScreen/>}/>
                <Route path="/auth/verify-email/:validation_token" element={<ValidateMailScreen/>}/>
                <Route path="/auth/recovery-password/:reset_token" element={<RecoveryPasswordScreen/>}/>
                <Route path="/about_us" element={<AboutUs/>}/>
                <Route element={<ProtectedRoute/>}>
                    <Route path="/home" element={<HomeScreen/>}/>
                    <Route path="/product/:product_id"  element={<ProductDetailScreen/>}/>
                    <Route path="/product/new" element={<CreateProductScreen/>}/>
                </Route>
            </Routes>
        </div>
    )
}

export default App
