import getDAO from '../dao/factory.js';

class UserRepository {
    constructor() {
        this.dao = getDAO('user');
    }

    async getUserById(id) {
        return await this.dao.getById(id);
    }
}

export default UserRepository;