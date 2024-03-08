import fs from "fs";

export class CartManager {
  constructor(filePath) {
    this.filePath = filePath;
    this.products = [];
    this.readProductsFromFile();
  }

  async readProductsFromFile() {
    try {
      const data = await fs.promises.readFile(this.filePath, "utf-8");
      this.products = JSON.parse(data);
      this.nextId =
        this.products.length > 0
          ? Math.max(...this.products.map((p) => p.id)) + 1
          : 1;
    } catch (error) {
      console.error("Error durante la lectura del archivo:", error.message);
      this.products = [];
    }
  }
}
