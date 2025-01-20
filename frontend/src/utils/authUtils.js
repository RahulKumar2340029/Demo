export const checkAuth = async () => {
    try {
        const response = await fetch('http://localhost:3001/user/profile', {
            method: 'GET',
            credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
            const data = await response.json();
            return { isAuthenticated: true, user: data.user }; // Return user data
        } else {
            return { isAuthenticated: false, user: null }; // Not authenticated
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        return { isAuthenticated: false, user: null }; // Error case
    }
};
