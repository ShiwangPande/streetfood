import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="bg-background text-yellow min-h-screen p-6">
            <div className="container mx-auto">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <p className="mb-4">Effective Date: <span className="font-semibold">5/7/2024</span></p>

                <h2 className="text-2xl font-semibold mb-2">Introduction</h2>
                <p className="mb-4">Welcome to <span className="font-semibold">KartMatch</span>. We value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we use your information when you use our app.</p>

                <h2 className="text-2xl font-semibold mb-2">Information We Use</h2>

                <h3 className="text-xl font-semibold mb-2">1. Location Information</h3>
                <p className="mb-4">
                    <strong>Purpose:</strong> We require you to enable location services to show vendors around you.
                </p>
                <p className="mb-4">
                    <strong>Usage:</strong> This information is used solely to provide location-based services within the app. We do not collect or store your location data.
                </p>

                <h3 className="text-xl font-semibold mb-2">2. User ID and Comments</h3>
                <p className="mb-4">
                    <strong>Purpose:</strong> When you leave a comment, we collect your user ID and the content of your comment.
                </p>
                <p className="mb-4">
                    <strong>Usage:</strong> Your user ID is used to associate comments with your account, allowing you to manage and delete your comments.
                </p>

                <h2 className="text-2xl font-semibold mb-2">How We Use Your Information</h2>
                <p className="mb-4">
                    <strong>Location Data:</strong> To show vendors around your current location. This data is used in real-time and not stored or collected by us.
                </p>
                <p className="mb-4">
                    <strong>User ID and Comments:</strong> To enable you to interact with the app, leave comments, and manage them.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Sharing of Information</h2>
                <p className="mb-4">We do not share your personal information with third parties, except as required by law or to protect our rights.</p>

                <h2 className="text-2xl font-semibold mb-2">Data Security</h2>
                <p className="mb-4">We implement appropriate security measures to protect your information from unauthorized access, alteration, disclosure, or destruction.</p>

                <h2 className="text-2xl font-semibold mb-2">User Rights</h2>
                <p className="mb-4">
                    <strong>Access:</strong> You can request access to the personal information we have about you.
                </p>
                <p className="mb-4">
                    <strong>Correction:</strong> You can request correction of any incorrect or incomplete information.
                </p>
                <p className="mb-4">
                    <strong>Deletion:</strong> You can delete your comments through the app.
                </p>

                <h2 className="text-2xl font-semibold mb-2">Changes to This Privacy Policy</h2>
                <p className="mb-4">We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.</p>

                <h2 className="text-2xl font-semibold mb-2">Contact Us</h2>
                <p className="mb-4">
                    If you have any questions or concerns about this Privacy Policy, please contact us at:
                </p>
                <p className="mb-4">
                    <strong>Email:</strong> shiwangpande1@gmail.com
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
