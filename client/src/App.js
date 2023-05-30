import { Route, Routes } from "react-router-dom"
import React from "react"

import Landing from "./components/Landing/Landing"
import "../src/index.css"
import Detail from "./components/Detail/Detail"
import Home from "./components/Home/Home"
import Form from "./components/Form/Form"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/home" element={<Home />} />
      <Route path="/form" element={<Form />} />
      <Route path="/detail/:id" element={<Detail />} />
    </Routes>
  )
}

export default App
