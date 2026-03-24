import { jest, test } from "@jest/globals";
import { bookController } from "./book.controller.js";
import { Book } from "../models/index.js";

describe("bookController.getAllBooks", () => {
  beforeEach(() => {
    jest.restoreAllMocks(); // Reset mocks before each test
  });

  test("returns paginated list of books", async () => {
    jest.spyOn(Book, "findAll").mockResolvedValue([
      { id: 1, title: "Livre 1" },
      { id: 2, title: "Livre 2" },
    ]);
    jest.spyOn(Book, "count").mockResolvedValue(2); // Mock Sequelize methods

    const req = {
      query: { page: "1", limit: "2" },
      session: {},
    };
    const res = { json: jest.fn() }; // Mock res.json

    await bookController.getAllBooks(req, res);

    expect(Book.findAll).toHaveBeenCalled();
    expect(Book.count).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith({
      page: 1,
      totalPages: 1,
      totalBooks: 2,
      books: [
        { id: 1, title: "Livre 1" },
        { id: 2, title: "Livre 2" },
      ],
    });
  });
});
