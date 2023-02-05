import "./PlaceLabel.css"
type PlaceLabelProps = {
    name: string;
    placeId: number;
    years?: number[];
    onClick: (id: number) => void;
    isSelected: boolean;
}

function displayYears(years: number[] | undefined): string | undefined {
    return years !== undefined && years.length !== 0
        ? `${years[0]}-${years[years.length - 1]}`
        : undefined;
}

export function PlaceLabel(props: PlaceLabelProps) {
    const handleClick: React.MouseEventHandler = (_: React.MouseEvent) => {
        props.onClick(props.placeId);
    };
    const displayYearsResult = displayYears(props.years);
    const getClasses = () => {
        const classes = [
            "place-label-container"
        ];
        if (props.isSelected) classes.push("selected-label-container");
        return classes.join(" ");
    }
    return (<div className={getClasses()} onClick={handleClick}>
        <div>{props.name}</div>
        {displayYearsResult !== undefined ? <div>{displayYearsResult}</div> : undefined}
    </div>);
}
