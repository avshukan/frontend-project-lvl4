import SocketContext from './SocketContext.jsx';

const SocketProvider = ({ children, socket }) => {

    // useEffect(() => {
    //     socket.on('newMessage', (payload) => {
    //       if (!auth.logged()) {
    //         return;
    //       }
    //       dispatch(addMessage(payload));
    //     });
    //   }, []);

    //   const initFetchData = useCallback(() => {
    //     if (!auth.logged()) {
    //       return;
    //     }
    //     const token = auth.getToken();
    //     dispatch(fetchData(token));
    //   }, []);

    return (
        <SocketContext.Provider value={{ a: 1 }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
