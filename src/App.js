import Login from "./Comps/Login";
import Products from "./Comps/Products";
import Product from "./Comps/Product";
import Account from "./Account";
import {BrowserRouter, Routes, Route} from "react-router-dom";

function App() {
  return (
    <div className="w-screen h-screen">
      <BrowserRouter>
        <main>
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/products" element={<Products />}/>
            <Route path="/products/:id" element={<Product />}/>
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      
      
      </BrowserRouter>
      
    </div>
  );
}

export default App;
