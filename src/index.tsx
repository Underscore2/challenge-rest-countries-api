import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../src/style/reset.css"
import "../src/App.css";
import ContextApiProvider from "./context/ContextApiProvider";
import Main from "./pages/Main";
import List from "./pages/List";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Info from "./pages/Info";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <ContextApiProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<Main />}>
          <Route path="/" element={<List />} />
          <Route path="/countries/:id" element={<Info/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </ContextApiProvider>
);
