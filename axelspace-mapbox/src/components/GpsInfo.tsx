import { Button } from "@mui/material"
import "./GpsInfo.css"

type GpsInfoProps = {
    longitude: number;
    latitude: number;
    zoom: number;
    prevDisabled: boolean;
    nextDisabled: boolean;
}

export function GpsInfo(props: GpsInfoProps) {
    return (
        <div className="gps-info">
            <div className="gps-info-contents thin-gray-background">
                <Button
                    variant="contained"
                    disabled={props.prevDisabled}
                >Prev</Button>
                <div>longitude:{props.longitude}</div>
                <div>latitude:{props.latitude}</div>
                <div>zoom:{props.zoom}</div>
                <Button
                    variant="contained"
                    disabled={props.nextDisabled}
                >Next</Button>
            </div>
        </div>
    );
}
