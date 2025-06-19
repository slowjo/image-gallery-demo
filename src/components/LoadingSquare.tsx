export default function LoadingSquare() {
// export default function LoadingSquare({ loading } : { loading : boolean }) {
    return (
        <div className="loading-square" />
        // <div className={`loading-square ${loading ? '' : 'opacity-0'}`} />
        // <div className={`loading-square ${loading ? '' : 'hidden'}`} />
    );
}