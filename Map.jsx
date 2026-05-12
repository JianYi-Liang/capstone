import { useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { icon } from 'leaflet';
import PinImage from '../assets/pin.png';
import './Map.css';

const zipCode = {
    '94601': [37.78003749587587, -122.21868617617271],
    '94602': [37.80387388640707, -122.20817495047491],
    '94603': [37.74088004336868, -122.17547939296104],
    '94604': [37.8002832435929, -122.26992036237085],
    '94605': [37.765091905950335, -122.14997064230342],
    '94606': [37.79487745727223, -122.24243664975566],
    '94607': [37.81302693547323, -122.2915390589194],
    '94608': [37.837715708782575, -122.28306570270102],
    '94609': [37.83235233818667, -122.26368148863415],
    '94610': [37.813309836368326, -122.23995870456244],
    '94611': [37.82742673100499, -122.22585279573467],
    '94612': [37.80968244188927, -122.27005234505488],
    '94613': [37.781532288775935, -122.18238720501634],
    '94614': [37.719954693344626, -122.2195853408215],
    '94615': [37.80255017535446, -122.29728808207813],
    '94617': [37.799960342360464, -122.26997737092049],
    '94618': [37.845337596590376, -122.24094712863901],
    '94619': [37.82296000101507, -122.23021331143612],
    '94620': [37.82938752607113, -122.250086088649],
    '94621': [37.82289220252274, -122.23055663419996],
    '94622': [37.74026920591322, -122.18965693548061],
    '94623': [37.80470982221576, -122.30066199665687],
    '94624': [37.75094781778152, -122.17000025821265],
    '94661': [37.83094673839069, -122.21000025795803],
    '94662': [37.84128551848332, -122.29017191930808],
    
};


function Map(){
    const [zipQuery, setZipQuery] = useState('');
    const [nearestMarker, setNearestMarker] = useState(null);
    const [zipMessage, setZipMessage] = useState('');
    const markers = [
        {position: [37.8061326, -122.2715286],
            label: 'VibrantCare Rehabilitation',},
        {position: [37.8065378, -122.2736809],
            label: 'Department of Rehabilitation',},
        {position: [37.82734758531728, -122.25469395119661],
            label: 'The Rehabilitation Center of Oakland',},
        {position: [37.82171356185388, -122.26285352424587],
            label: 'Alta Bates Summit Medical Center',},
        {position: [37.7947223, -122.2249948],
            label: 'Oakland Heights Nursing and Rehabiliation',},
         {position: [37.8065378, -122.2736809],
            label: 'Rehabilitation Unit',},
        {position: [37.81964089115859, -122.26414374220812],
            label: 'Merrit Peralta Institute',},
         {position: [37.8166138, -122.2454102],
            label: 'Oakland Detox Specialists',},
         {position: [37.81945919052109, -122.26320757584611],
            label: 'Oakland Health and Wellness',},
        {position: [37.827137876482794, -122.25496293242638],
            label: 'Rounseville Rehabilitation Center',},
        {position: [37.8133567, -122.2695108],
            label: 'Cura Inc.',},
        {position: [37.8169849, -122.2536285],
            label: 'El Chante-Recovery Home',},
        {position: [37.8183946623342, -122.26628547475363],
            label: 'McClure Post Acute',},
        {position: [37.85756429802148, -122.2665694422081],
            label: 'Elmwood Nursing Rehabilitation Hospital',},
        {position: [37.81971011426167, -122.25618891151711],
            label: 'Casa Del La Vida',},
        {position: [37.83700552218902, -122.26710248453536],
            label: 'Rehabilitation Center, UCSF Childrens Hospital',},
    ];


    const mapIcon = icon({
        iconUrl: PinImage,
        iconSize: [35, 40],
    });

    const foundIcon = icon({
        iconUrl: PinImage,
        iconSize: [55, 60],
    });

    const center = nearestMarker ? nearestMarker.position : [37.8044, -122.2711];

    const handleZipSearch = (event) => {
        event.preventDefault();
        const zip = zipQuery.trim();

        if (!zip) {
            setZipMessage('Enter an Oakland zip code');
            setNearestMarker(null);
            return;
        }

        const zipCenter = zipCode[zip];

        if (!zipCenter) {
            setZipMessage('No zip code data available for that area. Try another Oakland zip code.');
            setNearestMarker(null);
            return;
        }

        let closest = null;
        let minDistance = Infinity;

        markers.forEach((marker) => {
            const latDiff = marker.position[0] - zipCenter[0];
            const lngDiff = marker.position[1] - zipCenter[1];
            const distance = latDiff * latDiff + lngDiff * lngDiff;
            if (distance < minDistance) {
                minDistance = distance;
                closest = marker;
            }
        });

        setNearestMarker(closest);
        setZipMessage(`Closest facility to ${zip} is ${closest.label}.`);
    };

    return(
        <div className="mapPage">
            <h1>Rehab facilities in Oakland</h1>
            <div className="zipSearchBar">
                <form onSubmit={handleZipSearch} className="zipSearchForm">
                    <input
                        type="text"
                        value={zipQuery}
                        onChange={(e) => setZipQuery(e.target.value)}
                        placeholder="Enter Oakland zip code"
                        maxLength={5}
                    />
                    <button type="submit">Find closest</button>
                </form>
                <p className="zipMessage">{zipMessage}</p>
            </div>
            <MapContainer center={[37.8044557,-122.271356]} zoom={15} className="mapCenter">
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        icon={nearestMarker && marker.label === nearestMarker.label ? foundIcon : mapIcon}
                    >
                        {marker.label && (
                            <Popup>{marker.label}</Popup>
                        )}
                    </Marker>
                ))}
            </MapContainer>
        </div>
    )
}

export default Map;