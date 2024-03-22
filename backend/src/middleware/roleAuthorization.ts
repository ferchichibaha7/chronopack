import HttpStatusCodes from 'http-status-codes';
import { User } from '../models/User';

export default function(roleNames: string[]) {
  return async function(req, res, next) {
    try {
      // Get the current user from the request object
      const currentUser = req['currentUser'] as User;

      // Check if the user has one of the required roles      
      if (currentUser && currentUser.role && roleNames.includes(currentUser.role.role_name)) {
        // User is authorized to access the route
        next();
      } else {
        // User does not have any of the required roles
        return res.status(HttpStatusCodes.FORBIDDEN).json({ message: 'Access denied' });
      }
    } catch (error) {
      // Internal server error
      console.error(error);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Internal server error' });
    }
  };
}