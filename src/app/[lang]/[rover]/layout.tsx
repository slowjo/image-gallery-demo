export default function RoverLayout(
    { children, modal }
     : { children : React.ReactNode, modal : React.ReactNode }) {
    return (
        <main>
            {children}
            {modal}
        </main>
    );
}