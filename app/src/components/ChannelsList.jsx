import AuthProvider from "../context/AuthProvider.jsx";
import { useSelector } from "react-redux";

const ChannelsList = () => {
    const { channels } = useSelector((state) => state.data);
    console.log('channelsList', channels)

    return (
        <AuthProvider>
            <ul className="nav flex-column nav-pills nav-fill px-2">
                {/* {data.channels.map(((item) => {
                    return <li className="nav-item w-100"><button type="button" className="w-100 rounded-0 text-start btn btn-secondary"><span className="me-1">#</span>{item.name}</button></li>
                }))} */}
            </ul>
        </AuthProvider>
    );
};

export default ChannelsList;
