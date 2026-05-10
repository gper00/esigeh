import L from "leaflet";
import { createControlComponent } from "@react-leaflet/core";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

const createRoutineMachineLayer = ({ userLocation, destination }) => {
  const instance = L.Routing.control({
    waypoints: [
      L.latLng(userLocation[0], userLocation[1]),
      L.latLng(destination[0], destination[1])
    ],
    lineOptions: {
      styles: [{ color: "#2563eb", weight: 6, opacity: 0.8 }]
    },
    show: false, // Sembunyikan instruksi teks agar peta tidak penuh
    addWaypoints: false,
    routeWhileDragging: false,
    draggableWaypoints: false,
    fitSelectedRoutes: true,
    createMarker: () => null // Kita sudah punya marker sendiri
  });

  return instance;
};

const RoutingMachine = createControlComponent(createRoutineMachineLayer);

export default RoutingMachine;
