// Import the 'decode' function from 'jwt-decode' library to decode a token
import decode from 'jwt-decode';

// Create a class for handling user authentication
class AuthService {
  // Method to get the user's profile data from the token
  getProfile() {
    // Decode the user's token to extract user information
    return decode(this.getToken());
  }

  // Method to check if a user is logged in
  loggedIn() {
    // Check if there is a saved token and if it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Method to check if a token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      // Check if the token's expiration time is in the past
      if (decoded.exp < Date.now() / 1000) {
        return true; // Token is expired
      } else {
        return false; // Token is not expired
      }
    } catch (err) {
      return false; // Token is invalid or expired
    }
  }

  // Method to get the user's token from local storage
  getToken() {
    return localStorage.getItem('id_token');
  }

  // Method to save the user's token to local storage and redirect to the home page
  login(idToken) {
    // Save the user's token to local storage
    localStorage.setItem('id_token', idToken);
    // Redirect to the home page
    window.location.assign('/');
  }

  // Method to log the user out by removing the token and profile data from local storage
  logout() {
    // Clear the user's token and profile data from local storage
    localStorage.removeItem('id_token');
    // Reloading the page resets the application's state
    window.location.assign('/');
  }
}

// Export an instance of the 'AuthService' class
// eslint-disable-next-line
const Auth = new AuthService();
export default Auth;
