import React from "react";
import { ApiContext } from "../../context/ContextApiProvider";
import json from "./navbar.json";

class Navbar extends React.Component {
  static contextType=ApiContext;

  context!:React.ContextType<typeof ApiContext>

  render() {
    return (
      <>
        {json.map((data, index) => {
          return (
            <div
              key={index}
              className={` ${this.context.theme.elements} ${this.context.theme.background} shadow py-4 vh-10 d-flex justify-content-between align-items-center px-2 px-sm-5 w-100`}
            >
              <h5 className={`nunito-800 m-0 ${this.context.theme.text} `}>{data["navbar-title"]}</h5>
              <button className={`${this.context.theme.elements} ${this.context.theme.text} ${this.context.theme.colors ?   " border border-white" : "border border-dark"} shadow
               px-2 py-1 rounded-pill shadow nunito-600 d-flex gap-2 align-items-center`}
               onClick={()=>this.context.handleTheme()}>
                <img
                  width="18"
                  height="18"
                  src={this.context.theme.colors ?  data["sun-icon"] : data["moon-icon"]}
                  alt="icon"
                ></img>
               {this.context.theme.colors ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          );
        })}
      </>
    );
  }
}

export default Navbar;
