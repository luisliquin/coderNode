import UserDAO from './UserDAO.js';
import ProductDAO from './ProductDAO.js';
import CartDAO from './CartDAO.js';
import TicketDAO from './TicketDAO.js';

const getDAO = (type) => {
    switch (type) {
        case 'user':
            return new UserDAO();
        case 'product':
            return new ProductDAO();
        case 'cart':
            return new CartDAO();
        case 'ticket':
            return new TicketDAO();
        default:
            throw new Error('Invalid DAO type');
    }
};

export default getDAO;