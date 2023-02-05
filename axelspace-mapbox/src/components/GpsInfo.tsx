import { Button } from "@mui/material"
import "./GpsInfo.css"

type GpsInfoProps = {
    longitude: number;
    latitude: number;
    zoom: number;
    prevDisabled: boolean;
    nextDisabled: boolean;
    onNext: () => void;
    onPrev: () => void;
}

export function GpsInfo(props: GpsInfoProps) {
    return (
        <div className="gps-info">
            <div className="gps-info-contents thin-gray-background">
                <Button
                    variant="contained"
                    disabled={props.prevDisabled}
                    onClick={() => props.onPrev()}
                >Prev</Button>
                <div>longitude:{props.longitude}</div>
                <div>latitude:{props.latitude}</div>
                <div>zoom:{props.zoom}</div>
                <Button
                    variant="contained"
                    disabled={props.nextDisabled}
                    onClick={() => props.onNext()}
                >Next</Button>
            </div>
        </div>
    );
}
