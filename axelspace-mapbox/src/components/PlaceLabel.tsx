import "./PlaceLabel.css"
type PlaceLabelProps = {
    name: string;
    id: number;
    years?: number[];
    onClick: (id: number) => void;
}

function displayYears(years: number[] | undefined): string | undefined {
    return years !== undefined && years.length !== 0
        ? `${years[0]}-${years[years.length - 1]}`
        : undefined;
}

export function PlaceLabel(props: PlaceLabelProps) {
    const handleClick: React.MouseEventHandler = (_: React.MouseEvent) => {
        props.onClick(props.id);
    };
    const displayYearsResult = displayYears(props.years);
    return (<div className="place-label-container" onClick={handleClick}>
        <div>{props.name}</div>
        {displayYearsResult !== undefined ? <div>{displayYearsResult}</div> : undefined}
    </div>);
}
