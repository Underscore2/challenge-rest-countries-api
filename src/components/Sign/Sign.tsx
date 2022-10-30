import { ApiContext } from "../../context/ContextApiProvider";
import React from "react"
import json from "./sign.json"
class Sign extends React.Component{
    static contextType= ApiContext;
    context!:React.ContextType<typeof ApiContext>
    render(): React.ReactNode {
        return(
            <div className={` d-flex justify-content-center align-items-center ${this.context.theme.text} `}>
            {json.map((item:any,index:any) => {
              return (
                <p
                  key={index}
                  className="m-0 px-0 px-md-5 mt-5 py-3 w-100 text-center d-flex justify-content-center gap-1 align-items-center"
                >
                  Made with <span style={{color:'red'}}>&#10084;</span> by
                  <a
                    className={`${this.context.theme.text} d-flex justify-content-center align-items-center text-decoration-none`}
                    href="https://github.com/Underscore2"
                  >
                    {" "}
                    <i>Underscore2</i>{" "}
                    <img
                      width={25}
                      height={25}
                      alt="github"
                      src={this.context.theme.colors ? item["github-logo"] : item["github-dark"]}
                    ></img>
                  </a>
                </p>
              );
            })}
          </div>
        )
    }
}
export default Sign