import fs from "fs";

export class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
  }
}
