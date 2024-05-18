const vendorData = [
    {
        name: 'Phuchka Wala',
        location: {
            type: 'Point',
            coordinates: [88.363, 22.573] // Updated coordinates near Kolkata
        },
        foodItems: ['Phuchka', 'Chaat'],
        hygieneRating: 4,
        tasteRating: 5,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
        
    },
    {
        name: 'Kathi Roll Corner',
        location: {
            type: 'Point',
            coordinates: [88.365, 22.576] // Updated coordinates near Kolkata
        },
        foodItems: ['Kathi Roll', 'Paratha'],
        hygieneRating: 5,
        tasteRating: 4,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    },
    {
        name: 'Jhalmuri Stall',
        location: {
            type: 'Point',
            coordinates: [88.361, 22.570] // Updated coordinates near Kolkata
        },
        foodItems: ['Jhalmuri', 'Bhel Puri'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
  
    },
    {
        name: 'Chowmein Junction',
        location: {
            type: 'Point',
            coordinates: [88.366, 22.574] // Updated coordinates near Kolkata
        },
        foodItems: ['Chowmein', 'Hakka Noodles'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
      
    },
    {
        name: 'Fish Fry Corner',
        location: {
            type: 'Point',
            coordinates: [88.367, 22.572] // Updated coordinates near Kolkata
        },
        foodItems: ['Fish Fry', 'Fish Cutlet'],
        hygieneRating: 4,
        tasteRating: 5,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    },
    {
        name: 'Biryani Paradise',
        location: {
            type: 'Point',
            coordinates: [88.368, 22.571] // Updated coordinates near Kolkata
        },
        foodItems: ['Chicken Biryani', 'Mutton Biryani'],
        hygieneRating: 5,
        tasteRating: 5,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    },
    {
        name: 'Momos Corner',
        location: {
            type: 'Point',
            coordinates: [88.364, 22.572] // Updated coordinates near Kolkata
        },
        foodItems: ['Veg Momos', 'Chicken Momos'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    },
    {
        name: 'Golgappa Stall',
        location: {
            type: 'Point',
            coordinates: [88.362, 22.571] // Updated coordinates near Kolkata
        },
        foodItems: ['Golgappa', 'Pani Puri'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    
    },
    {
        name: 'Dosa Junction',
        location: {
            type: 'Point',
            coordinates: [88.366, 22.570] // Updated coordinates near Kolkata
        },
        foodItems: ['Masala Dosa', 'Plain Dosa'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",

    }
    ,

    // sda
    {
        name: 'Chaat Corner',
        location: {
            type: 'Point',
            coordinates: [88.364, 22.571] // Updated coordinates near Kolkata
        },
        foodItems: ['Aloo Tikki', 'Samosa Chaat'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
      
    },
    {
        name: 'Sweets Stall',
        location: {
            type: 'Point',
            coordinates: [88.365, 22.572] // Updated coordinates near Kolkata
        },
        foodItems: ['Rasgulla', 'Sandesh'],
        hygieneRating: 4,
        tasteRating: 5,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    },
    {
        name: 'Bhel Puri Corner',
        location: {
            type: 'Point',
            coordinates: [88.366, 22.573] // Updated coordinates near Kolkata
        },
        foodItems: ['Bhel Puri', 'Sev Puri'],
        hygieneRating: 3,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
     
    },
    {
        name: 'Pav Bhaji Stall',
        location: {
            type: 'Point',
            coordinates: [88.367, 22.574] // Updated coordinates near Kolkata
        },
        foodItems: ['Pav Bhaji', 'Misal Pav'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    
    },
    {
        name: 'Rolls and Wraps Corner',
        location: {
            type: 'Point',
            coordinates: [88.368, 22.575] // Updated coordinates near Kolkata
        },
        foodItems: ['Chicken Roll', 'Egg Roll'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",

    },
    // Continue updating the coordinates for the remaining stalls...
    {
        name: 'Bengali Cuisine Stall',
        location: {
            type: 'Point',
            coordinates: [88.369, 22.576] // Updated coordinates near Kolkata
        },
        foodItems: ['Fish Curry', 'Alu Posto'],
        hygieneRating: 5,
        tasteRating: 5,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    },
    {
        name: 'Jalebi and Fafda Stall',
        location: {
            type: 'Point',
            coordinates: [88.370, 22.577] // Updated coordinates near Kolkata
        },
        foodItems: ['Jalebi', 'Fafda'],
        hygieneRating: 4,
        tasteRating: 4,
        hospitalityRating: 3,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    },
    {
        name: 'Pav Bhaji Junction',
        location: {
            type: 'Point',
            coordinates: [88.371, 22.578] // Updated coordinates near Kolkata
        },
        foodItems: ['Pav Bhaji', 'Butter Pav'],
        hygieneRating: 4,
        tasteRating: 5,
        hospitalityRating: 4,
        photoUrl: "https://i.postimg.cc/L5n3Lpy0/puchka.jpg",
    },
    // Continue updating the coordinates for the remaining stalls...

];

export default vendorData;
