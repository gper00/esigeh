import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl, useMapEvents, GeoJSON, Pane } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { 
  MapPin, Navigation, Info, AlertTriangle, Route, Locate, 
  Menu, X, Layers, Map as MapIcon, Phone, MapPinned, Compass, Eye, EyeOff, Type
} from 'lucide-react';
import RoutingMachine from './RoutingMachine';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
let UserIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png', shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
let NearestIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });
let TargetIcon = L.icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png', shadowUrl: iconShadow, iconSize: [25, 41], iconAnchor: [12, 41] });

L.Marker.prototype.options.icon = DefaultIcon;

function MapEvents({ onMapClick, onMapLongPress }) {
  useMapEvents({
    click(e) { onMapClick(e.latlng); },
    contextmenu(e) { onMapLongPress(e.latlng); }
  });
  return null;
}

function ChangeView({ center, zoom }) {
  const map = useMap();
  useEffect(() => { if (center) map.setView(center, zoom); }, [center, zoom, map]);
  return null;
}

function App() {
  const [shelters, setShelters] = useState([]);
  const [adminBoundaries, setAdminBoundaries] = useState(null);
  const [settlements, setSettlements] = useState(null);
  
  const [userLocation, setUserLocation] = useState(null);
  const [nearestShelter, setNearestShelter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mapCenter, setMapCenter] = useState([-8.358, 116.115]);
  const [mapZoom, setMapZoom] = useState(13);
  const [showRoute, setShowRoute] = useState(false);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // DEFAULT STYLE: SATELLITE
  const [mapStyle, setMapStyle] = useState('satellite');
  const [showLabels, setShowLabels] = useState(true);

  const [layers, setLayers] = useState({
    shelters: true,
    admin: false,
    settlements: false
  });

  const [customPoint, setCustomPoint] = useState(null);
  const [customAddress, setCustomAddress] = useState("");

  const API_BASE = `http://${window.location.hostname}:5000/api`;
  
  const mapUrls = {
    streets: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    satellite: 'https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
    hybrid: 'https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
    terrain: 'https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}'
  };

  // Label only layer (Transparent)
  const labelUrl = 'https://mt1.google.com/vt/lyrs=h&x={x}&y={y}&z={z}';

  useEffect(() => {
    fetchShelters();
    fetchMapData();
  }, []);

  const fetchShelters = async () => {
    try {
      const response = await axios.get(`${API_BASE}/shelters`);
      setShelters(response.data.features);
    } catch (error) { setError("Koneksi ke server backend gagal."); }
  };

  const fetchMapData = async () => {
    try {
      const [adminRes, settlementRes] = await Promise.all([
        axios.get(`${API_BASE}/map/admin-boundaries`),
        axios.get(`${API_BASE}/map/settlements`)
      ]);
      setAdminBoundaries(adminRes.data);
      setSettlements(settlementRes.data);
    } catch (error) { console.error("Error fetching map data", error); }
  };

  const getAddress = async (lat, lng) => {
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18`);
      return res.data.address.village || res.data.address.suburb || "Lombok Utara";
    } catch (e) { return "Lokasi di Peta"; }
  };

  const handleLongPress = async (latlng) => {
    setNearestShelter(null); setShowRoute(false); setUserLocation(null);
    setCustomPoint(latlng);
    setCustomAddress("Mencari lokasi...");
    const addr = await getAddress(latlng.lat, latlng.lng);
    setCustomAddress(addr);
  };

  const findNearest = async (lat, lng, isCustom = false) => {
    setLoading(true); setError(null); setShowRoute(false);
    setMapCenter([lat, lng]); setMapZoom(16);
    try {
      const response = await axios.get(`${API_BASE}/shelters/nearest?lat=${lat}&lng=${lng}`);
      setNearestShelter(response.data);
      setLoading(false); setIsSidebarOpen(false);
    } catch (error) { setError("Gagal menemukan evakuasi."); setLoading(false); }
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) return;
    setLoading(true); setCustomPoint(null); setNearestShelter(null); setShowRoute(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation([pos.coords.latitude, pos.coords.longitude]);
        findNearest(pos.coords.latitude, pos.coords.longitude);
      },
      () => { setError("Izin GPS ditolak."); setLoading(false); },
      { enableHighAccuracy: true, timeout: 15000 }
    );
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-gray-100 flex">
      
      {/* SIDEBAR */}
      <div className={`fixed inset-0 z-[4000] transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
        <aside className={`absolute inset-y-0 left-0 w-80 bg-white shadow-2xl p-6 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex items-center justify-between mb-10 pb-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-xl text-white"><Navigation size={22} /></div>
              <div><h1 className="text-2xl font-black text-gray-900 leading-none">ESIGEH</h1><p className="text-[9px] font-bold text-gray-400 uppercase tracking-widest mt-1">Lombok Utara</p></div>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-gray-50 rounded-xl text-gray-400"><X size={20}/></button>
          </div>

          <div className="space-y-8">
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Gaya Peta</p>
              <div className="grid grid-cols-1 gap-2">
                {[
                  { id: 'streets', label: 'Default Streets', icon: <MapIcon size={16}/> },
                  { id: 'satellite', label: 'Pure Satellite', icon: <MapIcon size={16}/> },
                  { id: 'hybrid', label: 'Hybrid (Sat + Road)', icon: <MapIcon size={16}/> }
                ].map(s => (
                  <button key={s.id} onClick={() => { setMapStyle(s.id); setIsSidebarOpen(false); }} className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold text-sm capitalize ${mapStyle === s.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}>
                    {s.icon} {s.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">Fitur & Layer</p>
              <div className="space-y-2">
                {/* LABEL TOGGLE */}
                <button 
                  onClick={() => setShowLabels(!showLabels)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm ${showLabels ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-400'}`}
                >
                  <div className="flex items-center gap-3"><Type size={16}/> Label Nama Tempat</div>
                  <div className={`w-10 h-5 rounded-full relative transition-colors ${showLabels ? 'bg-green-500' : 'bg-gray-300'}`}><div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${showLabels ? 'left-6' : 'left-1'}`}></div></div>
                </button>

                {[
                  { id: 'shelters', label: 'Titik Evakuasi', icon: <MapPin size={16}/> },
                  { id: 'admin', label: 'Batas Administrasi', icon: <Layers size={16}/> },
                  { id: 'settlements', label: 'Wilayah Pemukiman', icon: <Info size={16}/> }
                ].map(l => (
                  <button 
                    key={l.id} 
                    onClick={() => setLayers({...layers, [l.id]: !layers[l.id]})}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-bold text-sm ${layers[l.id] ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-400'}`}
                  >
                    <div className="flex items-center gap-3">{layers[l.id] ? <Eye size={16}/> : <EyeOff size={16}/>} {l.label}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </div>

      <main className="flex-1 relative">
        <button onClick={() => setIsSidebarOpen(true)} className="absolute top-6 left-6 z-[2000] bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white hover:bg-white active:scale-95 transition-all"><Menu size={24} /></button>
        <button onClick={handleGetCurrentLocation} disabled={loading} className="absolute top-6 right-6 z-[2000] bg-blue-600 p-4 rounded-2xl shadow-xl text-white active:scale-90 transition-transform">
          {loading ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Locate size={24} />}
        </button>

        <MapContainer center={mapCenter} zoom={mapZoom} zoomControl={false} style={{ height: '100%', width: '100%' }}>
          {/* BASE MAP LAYER */}
          <TileLayer attribution='&copy; ESIGEH' url={mapUrls[mapStyle]} />
          
          {/* OVERLAY LABEL LAYER (ONLY SHOW IF TOGGLED) */}
          {showLabels && mapStyle !== 'streets' && (
            <TileLayer url={labelUrl} opacity={0.8} />
          )}

          <ZoomControl position="bottomright" />
          <ChangeView center={mapCenter} zoom={mapZoom} />
          <MapEvents onMapClick={() => { if(!loading) { setCustomPoint(null); setNearestShelter(null); setShowRoute(false); } }} onMapLongPress={handleLongPress} />

          {layers.admin && adminBoundaries && (
            <GeoJSON data={adminBoundaries} style={{ color: '#ef4444', weight: 2, dashArray: '5, 5', fillOpacity: 0.1 }} />
          )}
          {layers.settlements && settlements && (
            <GeoJSON data={settlements} style={{ color: '#8b5cf6', weight: 1, fillOpacity: 0.2 }} />
          )}

          {layers.shelters && shelters.map((s) => (
            <Marker key={s.id} position={[s.geometry.coordinates[1], s.geometry.coordinates[0]]}>
              <Popup><div className="text-center"><p className="font-black text-gray-800 text-xs">{s.properties.name}</p></div></Popup>
            </Marker>
          ))}

          {customPoint && (
            <Marker position={customPoint} icon={TargetIcon}>
              <Popup closeOnClick={false} autoClose={false}>
                <div className="p-3 text-center min-w-[180px]">
                  <h4 className="font-black text-gray-800 text-sm mb-1">Titik Simulasi</h4>
                  <p className="text-[10px] font-bold text-orange-600 uppercase mb-3 italic">{customAddress}</p>
                  <button onClick={() => findNearest(customPoint.lat, customPoint.lng, true)} className="w-full bg-blue-600 text-white text-[9px] font-black py-2 rounded-xl shadow-lg">CARI EVAKUASI DARI SINI</button>
                </div>
              </Popup>
            </Marker>
          )}

          {userLocation && <Marker position={userLocation} icon={UserIcon} />}
          {nearestShelter && (
            <Marker position={[nearestShelter.geometry.coordinates[1], nearestShelter.geometry.coordinates[0]]} icon={NearestIcon} />
          )}

          {showRoute && (userLocation || customPoint) && nearestShelter && (
            <RoutingMachine 
              userLocation={customPoint ? [customPoint.lat, customPoint.lng] : userLocation} 
              destination={[nearestShelter.geometry.coordinates[1], nearestShelter.geometry.coordinates[0]]} 
            />
          )}
        </MapContainer>

        {nearestShelter && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-[3000] bg-white rounded-[2.5rem] shadow-2xl p-7 border border-gray-100 animate-in slide-in-from-bottom-10">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-4 rounded-[1.5rem] text-green-600"><MapPin size={26}/></div>
                <div><p className="text-[11px] font-black text-gray-300 uppercase tracking-widest">Tujuan Terdekat</p><p className="text-xl font-black text-gray-900 leading-tight">{nearestShelter.name}</p></div>
              </div>
              <div className="text-right"><p className="text-3xl font-black text-blue-600">{(nearestShelter.distance_meters/1000).toFixed(1)}</p><p className="text-[10px] font-bold text-gray-400 uppercase">KM</p></div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <button onClick={() => { setNearestShelter(null); setCustomPoint(null); setShowRoute(false); }} className="bg-gray-100 p-4 rounded-[1.5rem] text-gray-400 flex items-center justify-center hover:bg-gray-200 transition-colors"><X size={22}/></button>
              <button onClick={() => setShowRoute(true)} className="col-span-3 bg-blue-600 text-white font-black py-4 rounded-[1.5rem] shadow-xl flex items-center justify-center gap-2 active:scale-95 transition-all uppercase">Lihat Rute</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
