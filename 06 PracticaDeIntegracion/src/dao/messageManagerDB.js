import messageModel from "./models/MessageModel.js";

export default class MessagesManagerDB {
  async getMessages() {
    try {
      const messages = await messageModel.find({}).lean()
      return messages
    } catch (error) {
      console.error(error)
    }
  }

  async addMessage(user, message) {
    try {
      await messageModel.create({
        user: user,
        message: message
      })
    } catch (error) {
      console.error(error)
    }
  }
}