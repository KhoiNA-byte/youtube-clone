import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Search from "./pages/Search/Search.jsx";
import Detail from "./pages/Detail/Detail.jsx";
import {Provider} from 'react-redux'
import {store} from "./redux/store.js"
import Channel from "./pages/Channel/Channel.jsx";

function App() {

    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Search" element={<Search/>}/>
                <Route path="/detail/:id" element={<Detail/>}/>
                <Route path="/channel/:channelId" element={<Channel />} />
            </Routes>
        </Provider>
    );
}

export default App;
