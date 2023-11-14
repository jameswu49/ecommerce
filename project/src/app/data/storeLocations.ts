import brooklyn from "../images/brooklyn.png"
import newYork from "../images/new-york.png"
import sanFran from "../images/san-fran.png"
import hollywood from "../images/hollywood.png"
import chicago from "../images/chicago.jpeg"
import london from "../images/london.png"
import paris from "../images/paris.png"
import milan from "../images/milan.jpeg"
import berlin from "../images/berlin.png"
import shibuya from "../images/shibuya.jpeg"

const storeLocations = [
    {
        src: newYork,
        name: "New York",
        address1: "190 Bowery",
        address2: "NYC 100012",
        phone: "Tel: 212-966-7799",
        open1: "Open 11 - 7 (MON-SAT)",
        open2: "12 - 6 (SUN)",
        maps: "https://www.google.com/maps/place/Supreme/@40.7211892,-73.9966426,17z/data=!3m2!4b1!5s0x89c25988e2b905f3:0x20652b62a258b631!4m6!3m5!1s0x89c2598e814fa0db:0xb62b095e1c5b2d92!8m2!3d40.7211892!4d-73.9940677!16s%2Fg%2F1tfvj3h5?entry=ttu"
    },

    {
        src: brooklyn,
        name: "Brooklyn",
        address1: "152 Grand Street",
        address2: "Brooklyn, NY 11249",
        phone: "Tel:: 718-599-2700",
        open1: "Open 11 - 7 (MON-SAT)",
        open2: "12 - 6 (SUN)",
        maps: "https://www.google.com/maps/place/Supreme/@40.7145524,-73.9647152,17z/data=!3m1!4b1!4m6!3m5!1s0x89c25960522ff599:0xf714367a3b334c9a!8m2!3d40.7145524!4d-73.9621403!16s%2Fg%2F11d_yt69xj?entry=ttu"
    },

    {
        src: sanFran,
        name: "San Francisco",
        address1: "1015 Market Street",
        address2: "San Francisco, CA 94103",
        phone: "Tel: 415-991-2929",
        open1: "Open 11 - 7 (MON-SAT)",
        open2: "12 - 6 (SUN)",
        maps: "https://www.google.com/maps/place/Supreme/@37.7817707,-122.4130808,17z/data=!3m2!4b1!5s0x808f7fcd45ad3185:0xe6d6f11a6f173feb!4m6!3m5!1s0x80858197710a2055:0x98576a2954d15474!8m2!3d37.7817707!4d-122.4105059!16s%2Fg%2F11h7rj4wnq?entry=ttu"
    },

    {
        src: hollywood,
        name: "West Hollywood",
        address1: "8801 Sunset Blvd.",
        address2: "West Hollywood, CA 90069",
        phone: "Tel: 323-655-6205",
        open1: "Open 11 - 7 (MON-SAT)",
        open2: "12 - 6 (SUN)",
        maps: "https://www.google.com/maps/place/Supreme/@34.0907834,-118.3862765,17z/data=!3m1!4b1!4m6!3m5!1s0x80c2b93332920e19:0xfd9262386a2a8a8d!8m2!3d34.0907834!4d-118.3837016!16s%2Fg%2F1tlw9b9g?entry=ttu"
    },

    {
        src: chicago,
        name: "Chicago",
        address1: "1438 N Milwaukee Ave",
        address2: "Chicago, IL 60622",
        phone: "Tel: 312-300-0562",
        open1: "Open 11 - 7 (MON-SAT)",
        open2: "12 - 6 (SUN)",
        maps: "https://www.google.com/maps/place/Supreme/@41.90785,-87.6765848,17z/data=!3m1!4b1!4m6!3m5!1s0x880fd3b1485e9787:0xdd5cba7c771ce323!8m2!3d41.90785!4d-87.6740099!16s%2Fg%2F11t60whn9y?entry=ttu"

    },

    {
        src: london,
        name: "London",
        address1: "2/3 Peter Street",
        address2: "London W1F 0AA",
        phone: "Tel: +44 2-7-437-0493",
        open1: "Open 11 - 7 (MON-SAT)",
        open2: "12 - 6 (SUN)",
        maps: "https://www.google.com/maps/place/Supreme/@51.5129691,-0.1365371,17z/data=!3m1!4b1!4m6!3m5!1s0x487604d36dff4637:0x795276f5a4bce414!8m2!3d51.5129691!4d-0.1339622!16s%2Fg%2F1tgf2pqv?entry=ttu"
    },

    {
        src: paris,
        name: "Paris",
        address1: "20 Rue Barbette",
        address2: "Paris 75003",
        phone: "Tel: +33 1 43 48 80 14",
        open1: "Open 11 - 7 (MON-SAT)",
        open2: "12 - 6 (SUN)",
        maps: "https://www.google.com/maps/place/Supreme/@48.8593042,2.3574442,17z/data=!3m1!4b1!4m6!3m5!1s0x47e66e03b8ce48cf:0x6f30b44375c60a3c!8m2!3d48.8593042!4d2.3600191!16s%2Fg%2F11clsfwh93?entry=ttu"
    },

    {
        src: milan,
        name: "Milan",
        address1: "Corso Garibaldi 20",
        address2: "20121 Milan",
        phone: "Tel: +39 02 84349776",
        open1: "Open 11 - 7:30 (MON-SAT)",
        open2: "12 - 6 (SUN)",
        maps: "https://www.google.com/maps/place/Supreme/@45.4734964,9.1812381,17z/data=!3m1!4b1!4m6!3m5!1s0x4786c1c83f3a539b:0x40c9b981c5b8303e!8m2!3d45.4734964!4d9.183813!16s%2Fg%2F11pxhh44y3?entry=ttu"
    },

    {
        src: berlin,
        name: "Berlin",
        address1: "TorstraeBe 74",
        address2: "10119 Berlin",
        phone: "Tel: +49 030 27013724",
        open1: "Open 11 - 7 (MON-SAT)",
        open2: "Closed (SUN)",
        maps: "https://www.google.com/maps/place/Supreme/@52.5289718,13.4044057,17z/data=!3m2!4b1!5s0x47a851e254daee99:0xc26738b98676c85a!4m6!3m5!1s0x47a851b65ddff25d:0x113ef047954571b6!8m2!3d52.5289718!4d13.4069806!16s%2Fg%2F11s17kqbnd?entry=ttu"
    },

    {
        src: shibuya,
        name: "Shibuya",
        address1: "1-18-2 Jinnan",
        address2: "Shibuya-Ku",
        phone: "Tel: 03-5428-4393",
        open1: "Open 11 - 8 (MON-SUN)",
        open2: "",
        maps: "https://www.google.com/maps/place/Supreme+Shibuya/@35.662691,139.6972731,17z/data=!3m2!4b1!5s0x60188ca8eb2ffba9:0xb9edd67c93f97d5e!4m6!3m5!1s0x60188ca8e98c3ea7:0xe49f5a71eac06a80!8m2!3d35.662691!4d139.699848!16s%2Fg%2F1hf02ynzg?entry=ttu"
    },
]

export default storeLocations