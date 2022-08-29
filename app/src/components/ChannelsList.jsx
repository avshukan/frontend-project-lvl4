import { useDispatch, useSelector } from "react-redux";
import classnames from 'classnames';
import { switchChannel } from "../slices/dataSlice";

const ChannelsList = () => {
    const dispatch = useDispatch();

    const { channels, currentChannelId } = useSelector((state) => state.data);

    console.log('channelsList', channels, currentChannelId);

    const onSwitch = (id) => (event) => {
        event.preventDefault();
        dispatch(switchChannel({ channelId: id }));
    };

    return (
        <ul className="nav flex-column nav-pills nav-fill px-2">
            {channels.map((({ id, name }) => {
                const classname = classnames("w-100 rounded-0 text-start btn", { 'btn-secondary': currentChannelId !== id }, { 'btn-primary': currentChannelId === id });
                return (
                    <li key={id} className="nav-item w-100">
                        <button type="button" className={classname} onClick={onSwitch(id)}>
                            <span className="me-1">#</span>{name}
                        </button>
                    </li>
                )
            }))}
        </ul>
    );
};

export default ChannelsList;
