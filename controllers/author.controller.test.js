import { jest, test } from "@jest/globals";
import { authorController } from "./author.controller.js";
import { Author } from "../models/index.js";

// Testing getAllAuthors method
describe("authorController.getAllAuthors", () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  }); // Reset mocks before each test

  test("returns the list of all authors", async () => {
    jest.spyOn(Author, "findAll").mockResolvedValue([
      { id: 1, name: "Auteur 1" },
      { id: 2, name: "Auteur 2" },
      { id: 3, name: "Auteur 3" },
    ]); // Mock findAll to return three authors

    const req = {
      session: {},
    };
    const res = {
      json: jest.fn(),
    }; // Mock res.json to capture output

    await authorController.getAllAuthors(req, res); // Call the method under test

    expect(Author.findAll).toHaveBeenCalled(); // Ensure findAll was called
    expect(res.json).toHaveBeenCalledWith([
      { id: 1, name: "Auteur 1" },
      { id: 2, name: "Auteur 2" },
      { id: 3, name: "Auteur 3" },
    ]); // Ensure response contains the expected array
  });
});
