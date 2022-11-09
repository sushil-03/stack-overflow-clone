import Navbar from "./component/Navbar";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./component/AllRoutes";
import { loadUser } from "./actions/userAction";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllQuestion } from "./actions/questionAction";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadUser());
        dispatch(getAllQuestion());
    }, [dispatch]);
    return (
        <div className="App relative">
            <Router>
                <Navbar />
                <AllRoutes />
            </Router>
        </div>
    );
}

export default App;
