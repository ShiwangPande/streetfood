const vendorData = [
    {
        name: 'Faltu Tea Centre',
        location: {
            type: 'Point',
            coordinates: [88.34977042578359, 22.566996743461672] // Updated coordinates near Kolkata
        },
        foodItems: ['Tea Bhand (Small, Medium, Big)', 'Butter Toast', 'Malayi Toast', 'Pineapple Jelly Toast', 'Mango Jelly Toast', 'Milk 200 ml', 'Parcel Tea', 'Special Toast'],
        hygieneRating: 4,
        tasteRating: 5,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/rm9y4hQK/image.png",

    },
    {
        name: 'Sandwich stall',
        location: {
            type: 'Point',
            coordinates: [88.34959184394965, 22.566859716266062] // Updated coordinates near Kolkata
        },
        foodItems: ['veg sandwich', 'veg mayonise sandwich', 'veg cheese sandwich', 'special veg cheese sandwich', 'paneer cheese sandwich', 'sweet corn sandwich', 'sweet corn sandwich', 'corn cheese sandwich', 'veg club sandwich', 'aloo masala sandwich', 'aloo masala mayonise sandwich', 'aloo masala cheese sandwich', 'veg burger', 'cheese burger', 'toast cheese toast garlic', 'garlic toast', 'bada paw', 'cheese bada paw', 'garlic sandwich', 'garlic cheese sandwich'],
        hygieneRating: 3,
        tasteRating: 3,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/c4vgqSFh/image.png",
    },
    {
        name: 'Baba roll and snacks',
        location: {
            type: 'Point',
            coordinates: [88.34965389279975, 22.567002356267437] // Updated coordinates near Kolkata
        },
        foodItems: ['Momos', 'Rolls'],
        hygieneRating: 3.5,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/xdp32Lb0/image.png",

    },
    {
        name: 'Classic Fast Food Centre',
        location: {
            type: 'Point',
            coordinates: [88.34949906639834, 22.5668112907587] // Updated coordinates near Kolkata
        },
        foodItems: ['Egg/Chicken Fried Rice', ' Mix Fried Rice', 'Mix Chowmein', 'Egg/Chicken Chowmein', 'Veg Chowmein', 'Pulao', 'Fish Fry', 'Paneet Cutlet'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/FzHvL5Hb/image.png",

    },
    {
        name: 'House of Bengal',
        location: {
            type: 'Point',
            coordinates: [88.34950704129217, 22.56664445316902] // Updated coordinates near Kolkata
        },
        foodItems: ['Vegetable Chop', 'Narkel Mochar Chop', 'Vegetable Cutlet', 'Chicken Flow Cutlet', 'Mutton Chop', 'Mutton Cutlet', 'Bhetki Fish Finger'],
        hygieneRating: 4,
        tasteRating: 3,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/MHq705Cm/image.png",
    },
    {
        name: 'Metro Roll Centre',
        location: {
            type: 'Point',
            coordinates: [88.3494842424833, 22.566540425798234] // Updated coordinates near Kolkata
        },
        foodItems: ['Egg Roll', 'Chicken Roll', 'Paneer Roll', 'Veg Roll', 'Soyabean Roll', 'Laccha Paratha', 'Paneer Kebab', 'Chicken Kebab'],
        hygieneRating: 5,
        tasteRating: 5,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/nhHWVYM7/image.png",
    },
    {
        name: "Arun da'r Joy Ma Tara hotel",
        location: {
            type: 'Point',
            coordinates: [88.34944220487576, 22.56643946407634] // Updated coordinates near Kolkata
        },
        foodItems: ['Naan', 'Butter Naan', 'Tandoori Roti', 'Butter Roti', 'Paneer'],
        hygieneRating: 4,
        tasteRating: 5,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/QMgVgDhv/image.png",
    },
    {
        name: 'Chitto Babur Dokan',
        location: {
            type: 'Point',
            coordinates: [88.34934786623536, 22.56639266208926] // Updated coordinates near Kolkata
        },
        foodItems: ['Chicken Stew', 'Buttered Toast', 'Diamond Fish Fry', 'Fish Butter Fry'],
        hygieneRating: 5,
        tasteRating: 5,
        hospitalityRating: 5,
        photoUrl: "https://i.postimg.cc/W33jDc3G/image.png",

    },
    {
        name: 'Decars Lane (James Hickey Sarani)',
        location: {
            type: 'Point',
            coordinates: [88.34948469554695, 22.566166745907275] // Updated coordinates near Kolkata
        },
        foodItems: ["Kulcha Naan with Chicken Vorta", "Egg Chau", " Fried Rice and Chilli Chicken", "Veg Chowmein and Garlic Chicken", "Polao Butter Paneer", "Fish Batter Fry", "Fish Fry", "Khichuri", "Polao and Matar Paneer", "Begun Sundori", "Fried Rice Aloo Gobi"],
        hygieneRating: 5,
        tasteRating: 5,
        hospitalityRating: 5,
        photoUrl: "https://i.postimg.cc/nM8tws12/image.png",

    }
    ,

    {
        name: 'Deckers Corner',
        location: {
            type: 'Point',
            coordinates: [88.34989021747498, 22.567560906291412] // Updated coordinates near Kolkata
        },
        foodItems: ['fish fry', 'chicken kosha', 'Katla Kaliya', 'Luchi', 'Chicken Momo', 'Sandwiches', 'Chicken Kasha', 'Veg Thali'],
        hygieneRating: 3,
        tasteRating: 5,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/MGfNgZvr/image.png",

    },
    {
        name: 'Cafe Waterloo',
        location: {
            type: 'Point',
            coordinates: [88.34975242204689, 22.567870209616625] // Updated coordinates near Kolkata
        },
        foodItems: ['Egg Cheese Mushroom Masala', 'Namkeen', 'Grilled Chicken'],
        hygieneRating: 4,
        tasteRating: 5,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/rsffK7Dr/image.png",
    },
    {
        name: 'Song Hay',
        location: {
            type: 'Point',
            coordinates: [88.35025903325425, 22.567800160152334] // Updated coordinates near Kolkata
        },
        foodItems: ['noodels', 'chowmein', 'chicken noodles', 'ginger orange martini', 'Whisky sour'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/Wp586L4D/image.png",

    },
    {
        name: 'Sai vada pav centre',
        location: {
            type: 'Point',
            coordinates: [88.35042571896132, 22.567179140312426] // Updated coordinates near Kolkata
        },
        foodItems: ['Vada Pav', 'Pav Bhaji', 'Misal Pav'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/MGYV6VMc/image.png",

    },
    {
        name: 'Chitto Babur Dokan',
        location: {
            type: 'Point',
            coordinates: [88.34935332595364, 22.56648611861376] // Updated coordinates near Kolkata
        },
        foodItems: ['Chicken Stew and Buttered Toast', 'Diamond Fish Fry', 'Fish Butter Fry', 'paneer korma', 'Fulkopir korma'],
        hygieneRating: 2,
        tasteRating: 3,
        hospitalityRating: 2,
        photoUrl: "https://i.postimg.cc/xC4k8R0d/image.png",

    },
    // Continue updating the coordinates for the remaining stalls...
    {
        name: 'SHAWARMA NATION',
        location: {
            type: 'Point',
            coordinates: [88.44366650131101, 22.62265643738235] // Updated coordinates near Kolkata
        },
        foodItems: ['Israeli Chicken Shawarma', 'Persian Grilled Chicken Shawarma', 'Lebanese Chicken Shawarma', 'Crispy Chunchy Chicken Nugget', 'Turkish Shish Chicken Rice Bowl', 'Chispy Chicken Burger'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/GpMPPvcW/image.png",
    },
    {
        name: 'IFC BROTHER (IMROZ FALUDA CULFI)',
        location: {
            type: 'Point',
            coordinates: [88.44412263489934, 22.62248623841671] // Updated coordinates near Kolkata
        },
        foodItems: ['Faluda Kulfi', 'Faluda Kulfi with Rabri', 'Faluda Kulfi with Ice Cream', 'Faluda Kulfi with Ice Cream and Rabri'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/PqFZvhyh/image.png",
    },
    {
        name: 'Khao Pio Aish Karo',
        location: {
            type: 'Point',
            coordinates: [88.4439998507013, 22.62248221490303] // Updated coordinates near Kolkata
        },
        foodItems: ['roll ', 'Maggie', 'Vada pav', 'chaas', 'lassi', 'chocolate lassi', 'Milk', 'horlicks Milk', 'dhaba special milk'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/k5DRmzmH/image.png",
    },
    {
        name: 'BHIKHAARAM CHANDMAL RAJUJI',
        location: {
            type: 'Point',
            coordinates: [88.44346046455085, 22.62238349110128] // Updated coordinates near Kolkata
        },
        foodItems: ['Club Kachori', 'Pav Bhaji', 'Gulab Jamun', 'Chole Bhatura', 'Special Dosa', 'Manchurian', 'SPL Chowmin', 'Rosogolla'],
        hygieneRating: 5,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/mrckq93f/image.png",
    },
    {
        name: 'Corriander',
        location: {
            type: 'Point',
            coordinates: [88.44482503838528, 22.622194398693573] // Updated coordinates near Kolkata
        },
        foodItems: ['Nam Prik Chicken', 'Chicken Tangdi Kebab', 'Kabuli Naan', 'Kashmiri Pulao', 'Handi Ghost', 'Dahi Katla'],
        hygieneRating: 5,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/KzxXLS8q/image.png",
    },
    {
        name: 'MOMO - TOMO',
        location: {
            type: 'Point',
            coordinates: [88.43080179524269, 22.615652445848706] // Updated coordinates near Kolkata
        },
        foodItems: ['cheesy momos (steam/fried/pan fried)', 'Paneer Momos (steam/fried/pan fried)', 'Minced Chicken Momos (steam/fried/pan fried)', 'Cheesy Chicken Momos (steam/fried/pan fried)'],
        hygieneRating: 5,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/h4YyRRRk/image.png",
    },
    {
        name: 'ANNAPURNA FUCHKA STALL',
        location: {
            type: 'Point',
            coordinates: [88.43447927286053, 22.590646686559563] // Updated coordinates near Kolkata
        },
        foodItems: ['Fuchka', 'Dahi Puchka', 'Aloo Puchka', 'Churmur', 'Dahi Churmur', 'Aloo Churmur', 'Dahi Aloo Churmur',],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 2,
        photoUrl: "https://i.postimg.cc/NLhk9YgL/image.png",
    },
    {
        name: 'Rayyan Biryani',
        location: {
            type: 'Point',
            coordinates: [88.43458704656157, 22.590453830398896] // Updated coordinates near Kolkata
        },
        foodItems: ['Chicken Biryani', 'Mutton Biryani', 'Veg Biryani', 'Egg Biryani', 'Paneer Biryani'],
        hygieneRating: 2,
        tasteRating: 1,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/Hk9Fgv2b/image.png",
    },
    {
        name: 'BLACK OO DEE',
        location: {
            type: 'Point',
            coordinates: [88.43524147061405, 22.586660512330624] // Updated coordinates near Kolkata
        },
        foodItems: ['veg burger', 'chicken burger', 'veg steam momos', 'BOD special momos', 'chicken steam momos', 'chicken fried momos',],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/yxRrrLxg/image.png",
    },
    {
        name: 'Maa Lokhi Snacks',
        location: {
            type: 'Point',
            coordinates: [88.43699069341064, 22.586138401571453] // Updated coordinates near Kolkata
        },
        foodItems: ['noodles', 'fried rice', 'chicken noodles'],
        hygieneRating: 2,
        tasteRating: 3,
        hospitalityRating: 2,
        photoUrl: "https://i.postimg.cc/GmdSqJCt/image.png",
    },
    {
        name: 'Mother Baba Arsalan Biryani',
        location: {
            type: 'Point',
            coordinates: [88.43742784136789, 22.585693459707855] // Updated coordinates near Kolkata
        },
        foodItems: ['Chicken biryani', 'Mutton biryani', 'Veg biryani', 'Egg biryani', 'Paneer biryani'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/jdr8SQCc/image.png",
    },
    {
        name: 'Chauhan Victoria Vada',
        location: {
            type: 'Point',
            coordinates: [88.35346800781788, 22.548129729021174] // Updated coordinates near Kolkata
        },
        foodItems: ['Victoria Vada', 'Kaanji Vada', 'capsicum vada', 'jain victoria vada', 'paneer chilla', 'cheese chilla', 'paneer vada pav'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/dV5n6b6N/image.png",
    },
    {
        name: "Agarwal's Pav Bhaji",
        location: {
            type: 'Point',
            coordinates: [88.35389402375051, 22.54800496315143] // Updated coordinates near Kolkata
        },
        foodItems: ['Paw Bhaji', 'Veg momos', 'veg pizza', 'maggi', 'milkshakes'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/902GCb1q/image.png",
    },
    {
        name: 'Baccara',
        location: {
            type: 'Point',
            coordinates: [88.34641178226845, 22.535316869566884] // Updated coordinates near Kolkata
        },
        foodItems: ['Fresh lime soda', 'soda base mocktail', 'French fries', 'Baby corn', 'spring roll', 'Milk shake', 'cold coffee', 'Veg pasta'],
        hygieneRating: 3,
        tasteRating: 3,
        hospitalityRating: 1,
        photoUrl: "https://i.postimg.cc/8cCzRrz0/image.png",
    },
    {
        name: 'BALAJI CHAT HOUSR',
        location: {
            type: 'Point',
            coordinates: [88.35426069544228, 22.580978503678573] // Updated coordinates near Kolkata
        },
        foodItems: ['Chat', 'Pani Puri', 'sev Puri'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/yxJz6hds/image.png",
    },
    {
        name: 'Delhi Chat House',
        location: {
            type: 'Point',
            coordinates: [88.35409173855669, 22.58110215976075] // Updated coordinates near Kolkata
        },
        foodItems: ['Malai Lassi Small', 'Dahi Kachori', 'lassi', 'kulfi', 'palak patta chaat', 'dahi vada'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 5,
        photoUrl: "https://i.postimg.cc/DmVR2tHP/image.png",
    },
    {
        name: 'Kishan Cafe',
        location: {
            type: 'Point',
            coordinates: [88.35330016322823, 22.580912701690835] // Updated coordinates near Kolkata
        },
        foodItems: ['butter toast', 'plain', 'toasted sandwich', 'pizza', 'mocktails', 'garlic bread', 'butter sweet corn'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/HkRKMHnF/image.png",
    },
    // Continue updating the coordinates for the remaining stalls...

];

export default vendorData;
