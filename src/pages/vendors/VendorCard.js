import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import axios from 'axios';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
const VendorCard = ({ vendor, handleToggleComments, commentsEnabled }) => {
    const { name, foodItems, hygieneRating, tasteRating, hospitalityRating } = vendor;
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const currentUser = "currentUserId"; // Replace with actual current user ID
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`https://kartmatchbackend.onrender.com/api/vendors/${vendor.id}/comments`);
                setComments(response.data);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetchComments();
    }, [vendor.id]);

    const handleGetDirections = () => {
        const { coordinates } = vendor.location;
        const url = `https://www.google.com/maps/dir/?api=1&destination=${coordinates[1]},${coordinates[0]}`;
        window.open(url, '_blank');
    };

    const handleAddComment = async () => {
        if (newComment.trim() !== "") {
            try {
                const response = await axios.post(`https://kartmatchbackend.onrender.com/api/vendors/${vendor.id}/comments`, {
                    comment: newComment,
                    userId: currentUser
                });
                setComments([...comments, response.data]);
                setNewComment("");
            } catch (error) {
                console.error('Error adding comment:', error);
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`https://kartmatchbackend.onrender.com/api/comments/${commentId}`);
            setComments(comments.filter(comment => comment._id !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
        }
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(<FaStar key={i} className={i < rating ? "text-background-500 inline-block" : "text-gray-400 inline-block"} />);
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
                        {commentsEnabled && (
                            <Button className="mt-4 bg-background text-yellow px-4 py-2 rounded hover:bg-yellow hover:text-background border-2 border-background font-semibold focus:outline-none" onPress={onOpen}>Comment</Button>
                        )}
                    </div>
                    <Modal isOpen={isOpen} size="5xl" scrollBehavior="outside" isDismissable={false} isKeyboardDismissDisabled={true} placement="center"
                        className='top-14' onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col  text-2xl bg-background text-white gap-1">
                                        Add comment
                                    </ModalHeader>
                                    <ModalBody className="px-4 bg-yellow lg:px-8">
                                        <>
                                            <div className="mt-4">
                                                <h3 className="text-background font-bold mb-2">Comments:</h3>
                                                <ul className="list-disc list-inside  text-background overflow-y-auto max-h-32">
                                                    {comments.map((comment) => (
                                                        <>
                                                            <li key={comment._id} className="capitalize flex justify-between">


                                                                <div className='bg-wheat/80 w-full p-2 font-semibold rounded-lg'> {comment.comment} </div>
                                                                {comment.userId === currentUser && (
                                                                    <button className="h-full flex flex-row rounded-lg  justify-around" onClick={() => handleDeleteComment(comment._id)}>
                                                                        <div className="px-2 w-10 h-10 my-auto" color="primary">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                                                <path d="M5.755 20.283L4 8h16l-1.755 12.283A2 2 0 0 1 16.265 22h-8.53a2 2 0 0 1-1.98-1.717zM21 4h-5V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v1H3a1 1 0 0 0 0 2h18a1 1 0 0 0 0-2z" fill="#fd2222" />
                                                                            </svg>
                                                                        </div>
                                                                    </button>
                                                                )}
                                                            </li>
                                                            <hr className='border-1 my-2' />
                                                        </>
                                                    ))}
                                                </ul>
                                                <div className="mt-2">
                                                    <textarea
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        placeholder="Add a comment"
                                                        className="w-full p-2 border rounded text-background"
                                                    />
                                                    <button
                                                        onClick={handleAddComment}
                                                        className="mt-2 bg-background text-yellow px-4 py-2 rounded hover:bg-yellow hover:text-background border-2 border-background font-semibold focus:outline-none"
                                                    >
                                                        Add Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    </ModalBody>
                                </>
                            )}
                        </ModalContent>
                    </Modal>

                </CardFooter>
            </Card>
        </div>
    );
};

export default VendorCard;
