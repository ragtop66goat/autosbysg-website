import { generateImageId, isValidImageFile } from "../utils/imageUpload";

// Mock Firebase
jest.mock("../config/firebase", () => ({
  auth: {},
  db: {},
  storage: {},
}));

describe("imageUpload utilities", () => {
  describe("generateImageId", () => {
    test("generates a unique ID", () => {
      const id1 = generateImageId();
      const id2 = generateImageId();

      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
    });

    test("generates IDs of reasonable length", () => {
      const id = generateImageId();
      expect(id.length).toBeGreaterThan(10);
    });
  });

  describe("isValidImageFile", () => {
    test("returns false for null file", () => {
      expect(isValidImageFile(null)).toBe(false);
    });

    test("returns false for undefined file", () => {
      expect(isValidImageFile(undefined)).toBe(false);
    });

    test("returns true for valid JPEG file", () => {
      const file = new File(["dummy content"], "test.jpg", {
        type: "image/jpeg",
      });
      expect(isValidImageFile(file)).toBe(true);
    });

    test("returns true for valid PNG file", () => {
      const file = new File(["dummy content"], "test.png", {
        type: "image/png",
      });
      expect(isValidImageFile(file)).toBe(true);
    });

    test("returns true for valid WebP file", () => {
      const file = new File(["dummy content"], "test.webp", {
        type: "image/webp",
      });
      expect(isValidImageFile(file)).toBe(true);
    });

    test("returns false for invalid file type", () => {
      const file = new File(["dummy content"], "test.pdf", {
        type: "application/pdf",
      });
      expect(isValidImageFile(file)).toBe(false);
    });

    test("returns false for file too large", () => {
      const largeContent = new Array(6 * 1024 * 1024).join("a"); // 6MB
      const file = new File([largeContent], "test.jpg", {
        type: "image/jpeg",
      });
      expect(isValidImageFile(file)).toBe(false);
    });

    test("returns true for file at size limit", () => {
      const content = new Array(4 * 1024 * 1024).join("a"); // 4MB
      const file = new File([content], "test.jpg", {
        type: "image/jpeg",
      });
      expect(isValidImageFile(file)).toBe(true);
    });
  });
});
