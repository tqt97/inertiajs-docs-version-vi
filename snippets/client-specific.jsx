export const ClientSpecific = ({ children }) => {
    // What's this you ask? It's me getting around some mintlify wildness
    // I don't know why this works, but it does. Mintlify you crazy.
    const [nada, setNada] = useState();

    return children;
};
