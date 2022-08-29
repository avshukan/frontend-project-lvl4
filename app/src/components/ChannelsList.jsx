import { useSelector } from "react-redux";
import classnames from 'classnames';

const ChannelsList = () => {
    const { channels, currentChannelId } = useSelector((state) => state.data);
    console.log('channelsList', channels, currentChannelId);

    return (
        <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((({ id, name }) => {
                const classname = classnames("w-100 rounded-0 text-start btn", { 'btn-secondary': currentChannelId !== id }, { 'btn-primary': currentChannelId === id });
                return (
                    <li key={id} className="nav-item w-100">
                        <button type="button" className={classname}>
                            <span className="me-1">#</span>{name}
                        </button>
                    </li>
                )
            }))}
        </ul>
    );
};

export default ChannelsList;
