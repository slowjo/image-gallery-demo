export default function LoadingSquare({ loading } : { loading : boolean }) {
    return (
        <div className={`loading-square ${loading ? '' : 'hidden'}`} />
    );
}