// Sample data with 5 entries
const data = [
    { latitude: 28.7041, longitude: 77.1025, place: 'Delhi', mode: 'Railway' },
    { latitude: 27.1767, longitude: 78.0081, place: 'Agra', mode: 'Roadways' },
    { latitude: 26.9124, longitude: 75.7873, place: 'Jaipur', mode: 'Airways' },
    { latitude: 25.3176, longitude: 82.9739, place: 'Varanasi', mode: 'Railway' },
    { latitude: 23.2599, longitude: 77.4126, place: 'Bhopal', mode: 'Roadways' }
];

// Initialize the map
const map = L.map('map').setView([27.7, 77.5], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Â© OpenStreetMap contributors'
}).addTo(map);

// Add OpenRailwayMap layer to show railway routes
L.tileLayer('https://{s}.tile.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: 'Â© OpenRailwayMap contributors'
}).addTo(map);

// Define colors for different transport modes
const colors = {
    Railway: '#FFEA00', // A more visible yellow color for railways
    Roadways: 'red',
    Airways: 'blue'
};

// Function to add realistic road route using Leaflet Routing Machine
function addRoadRoute(point1, point2) {
    L.Routing.control({
        waypoints: [
            L.latLng(point1.latitude, point1.longitude),
            L.latLng(point2.latitude, point2.longitude)
        ],
        routeWhileDragging: true,
        createMarker: function() { return null; }, // No marker for roadways
        lineOptions: {
            styles: [{ color: 'red', weight: 4 }]
        }
    }).addTo(map);
}

// Function to add railway routes (as polyline)
function addRailwayRoute(point1, point2) {
    // Adding a railway line using polyline with dashed styling
    L.polyline([ 
        [point1.latitude, point1.longitude], 
        [point2.latitude, point2.longitude] 
    ], { 
        color: colors['Railway'],
        weight: 6, // Increased line weight for better visibility
        dashArray: '10, 10' // A dashed line to resemble railway tracks
    }).addTo(map);
}

// Plot the routes and markers
for (let i = 0; i < data.length - 1; i++) {
    const point1 = data[i];
    const point2 = data[i + 1];

    if (point1.mode === 'Roadways') {
        // Use realistic road routing
        addRoadRoute(point1, point2);
    } else if (point1.mode === 'Railway') {
        // Use actual railway route
        addRailwayRoute(point1, point2);
    } else {
        // For Airways, just draw a straight line
        L.polyline([ 
            [point1.latitude, point1.longitude], 
            [point2.latitude, point2.longitude] 
        ], { 
            color: colors[point1.mode] || 'black', 
            weight: 4 
        }).addTo(map);
    }

    // Add marker for the first point
    L.marker([point1.latitude, point1.longitude])
        .bindPopup(`<b>${point1.place}</b><br>Mode: ${point1.mode}`)
        .addTo(map);
}

// Add marker for the last point
const lastPoint = data[data.length - 1];
L.marker([lastPoint.latitude, lastPoint.longitude])
    .bindPopup(`<b>${lastPoint.place}</b><br>Mode: ${lastPoint.mode}`)
    .addTo(map);
