import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { ApiContext } from "../context/ContextApiProvider";
class Main extends React.Component{
    static contextType= ApiContext
    context!: React.ContextType<typeof ApiContext>
    render(): React.ReactNode {

        return(
            <Container fluid={true}  className={` m-0 p-0 afanculo ${this.context.theme.background}` }>
                <Navbar/>
                <Outlet/>
            </Container>
        )
    }
}

export default Main;