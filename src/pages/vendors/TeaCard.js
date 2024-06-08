import React from 'react';
import { FaStar } from 'react-icons/fa';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";

const VendorCard = ({ vendor }) => {
    const { name, foodItems, hygieneRating, tasteRating, hospitalityRating } = vendor;

    const handleGetDirections = () => {
        const { coordinates } = vendor.location;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;
        window.open(url, '_blank');
    };

    // Function to generate star icons based on rating
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < rating) {
                stars.push(<FaStar key={i} className="text-yellow-500 inline-block" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-400 inline-block" />);
            }
        }
        return stars;
    };

    // Filter food items to show only "tea"
    const teaItems = foodItems.filter(item => item.toLowerCase() === 'tea');

    return (
        <div>
            <Card>
                <CardBody className="overflow-visible p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={vendor.name}
                        className="w-full object-cover lg:min-h-96 min-h-56 max-h-96 rounded-t-lg"
                        src={vendor.photoUrl}
                    />
                </CardBody>
                <CardFooter className="text-small flex flex-col h-100 text-justify items-stretch lg:h-72 w-100 p-5 justify-between">
                    <h2 className="text-xl font-bold mb-2">{name}</h2>
                    <div className='flex flex-col'>
                        <strong>Food Items:</strong>
                        <div className="food-items overflow-auto min-h-5">
                            <p>{teaItems.length > 0 ? teaItems.join(', ') : 'No tea available'}</p>
                        </div>
                        <p><strong>Hygiene Rating:</strong> {renderStars(hygieneRating)}</p>
                        <p><strong>Taste Rating:</strong> {renderStars(tasteRating)}</p>
                        <p><strong>Hospitality Rating:</strong> {renderStars(hospitalityRating)}</p>
                        <button className="mt-4 bg-black text-white px-4 py-2 rounded hover:bg-[white] hover:text-black border-2 border-black font-semibold focus:outline-none" onClick={handleGetDirections}>
                            Get Directions
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default VendorCard;
