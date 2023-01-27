//  Plan 
// Avant ce la on prend l'adresse ip locale de l'utilisateur et on l'affiche sur la carte
// 1. Récupérer l'adresse IP de l'utilisateur au niveau de l'input
// 2. lorsque qu'on clique sur l'arrow
// 3. on lance un fecth et on récupere la data de l'api de deo/ipify
// 4. et on traite cette data pour afficher les infos sur la carte
// 5. et on affiche les infos dans le html

// take the data from https://geo.ipify.org/api/v2/country,city?apiKey=at_JO19YQ4Hwc2LtV6jHUPsdUoAtbVL0&ipAddress=8.8.8.8

const inputed = document.querySelector('input');
const arrow = document.querySelector('.arrow');
const renderDiv = document.querySelector('.wrap');

function AfficeIP(ip) {
    // fetch(`https://ipapi.co/${ip}/json/`)
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=64228e70fd7746a19694002a62cbf987&ip=${ip}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const ip = data.ip;
            const city = data.city;
            const region = data.state_prov;
            const postalCode = data.zipcode;
            const timezone = data.time_zone.name;
            const isp = data.isp;
            renderDiv.style.display = 'flex';
            renderDiv.innerHTML = `
            <div class="block">
                <p>IP Address</p>
                <span>${ip}</span>
            </div>
            <div class="block">
                <p>Location</p>
                <span>${region},${city} ${postalCode}</span>
            </div>
            <div class="block">
                <p>Timezone</p>
                <span>${timezone}</span>
            </div>
        <!-- add offset value dynamically using the API -->
        <div class="block">
            <p>ISP</p>
                <span>${isp}</span>
        </div>
            `;
            // var map=map.remove();
            const lat = data.latitude;
            const lng = data.longitude;
            // map.remove();
            document.querySelector('.container-map').innerHTML = "<div id='map' style='width: 100%; '></div>";
            var map = L.map('map').setView([lat, lng], 13);  // 51.505, -0.09
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map);
            L.marker([lat, lng]).addTo(map)
            map.flyTo([lat, lng], 10, {
                animate: true,
                duration: 2 // in seconds
            })
                .bindPopup('Here you are.')
                .openPopup();
        })
}



fetch('https://api.bigdatacloud.net/data/client-ip')
    .then(response => response.json())
    .then(data => {
        const ip = data.ipString;
        AfficeIP(ip);
    })
arrow.addEventListener('click', () => {
    const ip = inputed.value;
    console.log(inputed.value);
    // map.remove();
    AfficeIP(ip);
    })












