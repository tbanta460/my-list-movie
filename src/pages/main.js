import { BrowserRouter as Router} from "react-router-dom";
import {Routess} from "../config";
import {Header} from "../components";
const Main = () => {
    return(
        <>
            <Router>
                <Header />
                <Routess />
            </Router>
        </>
    )
}

export default Main