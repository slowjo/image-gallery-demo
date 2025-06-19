import LoadingSquare from "./LoadingSquare";

export default function LoadingGrid() {
    return (
        <section className="imagegrid-container">
            <ul className="imagegrid">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
                    <li key={item}>
                        <LoadingSquare />
                        {/* <LoadingSquare loading={true} /> */}
                    </li>
                ))}
            </ul>
        </section>
    );
}