import messageModel from "./models/MessageModel.js";

export default class MessageManagerDB {
  async getMessages() {
    try {
      const messages = await messageModel.find()
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