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
                stars.push(<FaStar key={i} className="text-background-500 inline-block" />);
            } else {
                stars.push(<FaStar key={i} className="text-gray-400 inline-block" />);
            }
        }
        return stars;
    };

    return (
        <div>
            <Card className='bg-yellow'>
                <CardBody className="overflow-visible bg-yellow p-0">
                    <Image
                        shadow="sm"
                        radius="lg"
                        width="100%"
                        alt={vendor.name}
                        className="w-full object-cover  lg:min-h-96 min-h-56 max-h-96 rounded-t-lg"
                        src={vendor.photoUrl}
                    />
                </CardBody>
                <CardFooter className="text-small flex flex-col h-100 text-justify items-stretch lg:h-fit w-100 p-5 justify-between">
                    <h2 className="text-xl font-bold capitalize mb-2 text-background">{name}</h2>
                    <div className='flex flex-col'>
                        <strong className='text-background'>Food Items:</strong>
                        <div className="food-items text-background overflow-auto min-h-5">
                            <p className='capitalize'>{foodItems.join(', ')}</p>
                        </div>
                        <p className='text-background'><strong>Hygiene Rating:</strong> {renderStars(hygieneRating)}</p>
                        <p className='text-background'><strong>Taste Rating:</strong> {renderStars(tasteRating)}</p>
                        <p className='text-background'><strong>Hospitality Rating:</strong> {renderStars(hospitalityRating)}</p>
                        <button className="mt-4 bg-background text-yellow px-4 py-2 rounded hover:bg-yellow hover:text-background border-2 border-background font-semibold focus:outline-none" onClick={handleGetDirections}>
                            Get Directions
                        </button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
};

export default VendorCard;
