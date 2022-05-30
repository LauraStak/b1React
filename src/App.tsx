import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Users from "./pages/users/Users";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserCreate from "./pages/users/UserCreate";
import UserEdit from "./pages/users/UserEdit";
import Roles from "./pages/roles/Roles";
import RolesCreate from "./pages/roles/RolesCreate";
import RolesEdit from "./pages/roles/RolesEdit";
import Products from "./pages/products/Products";
import ProductsCreate from "./pages/products/ProductsCreate";
import ProductsEdit from "./pages/products/ProductsEdit";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/Profile";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={"/register"} element={<Register />} />
          <Route path={"/login"} element={<Login />} />
          <Route path={"/"} element={<Dashboard />} />
          <Route path={"/users"} element={<Users />} />
          <Route path={"/users/create"} element={<UserCreate />} />
          <Route path={"/users/:id/edit"} element={<UserEdit />} />
          <Route path={"/roles"} element={<Roles />} />
          <Route path={"/roles/create"} element={<RolesCreate />} />
          <Route path={"/roles/:id/edit"} element={<RolesEdit />} />
          <Route path={"/products"} element={<Products />} />
          <Route path={"/products/create"} element={<ProductsCreate />} />
          <Route path={"/products/:id/edit"} element={<ProductsEdit />} />
          <Route path={"/orders"} element={<Orders />} />
          <Route path={"/profile"} element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
