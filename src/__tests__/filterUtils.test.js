import {
  filterInventory,
  parsePrice,
  parseMileage,
} from "../utils/filterUtils";

describe("Filter Utilities", () => {
  const mockInventory = [
    {
      id: "1",
      title: "2015 Honda Accord",
      price: "15,000",
      miles: "50,000",
      engine: "2.4L I-4",
      options: ["Power Windows", "Automatic Transmission"],
    },
    {
      id: "2",
      title: "2018 Toyota Camry",
      price: "20,000",
      miles: "30,000",
      engine: "2.5L I-4",
      options: ["Bluetooth", "Backup Camera"],
    },
    {
      id: "3",
      title: "2012 Ford Focus",
      price: "8,500",
      miles: "85,000",
      engine: "2.0L I-4",
      options: ["Power Brakes", "Manual Transmission"],
    },
    {
      id: "4",
      title: "2020 Honda Civic",
      price: "22,500",
      miles: "15,000",
      engine: "1.5L Turbo",
      options: ["Sunroof", "Automatic Transmission"],
    },
  ];

  describe("parsePrice", () => {
    it("should parse price string with commas", () => {
      expect(parsePrice("15,000")).toBe(15000);
      expect(parsePrice("1,234.56")).toBe(1234.56);
    });

    it("should parse price string without commas", () => {
      expect(parsePrice("15000")).toBe(15000);
    });

    it("should return 0 for invalid price", () => {
      expect(parsePrice("")).toBe(0);
      expect(parsePrice("abc")).toBe(0);
    });
  });

  describe("parseMileage", () => {
    it("should parse mileage string with commas", () => {
      expect(parseMileage("50,000")).toBe(50000);
      expect(parseMileage("123,456")).toBe(123456);
    });

    it("should parse mileage string without commas", () => {
      expect(parseMileage("50000")).toBe(50000);
    });

    it("should return 0 for invalid mileage", () => {
      expect(parseMileage("")).toBe(0);
      expect(parseMileage("xyz")).toBe(0);
    });
  });

  describe("filterInventory", () => {
    it("should return all inventory when no filters are applied", () => {
      const filters = {};
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(4);
    });

    it("should filter by search term (make)", () => {
      const filters = { searchTerm: "Honda" };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(2);
      expect(result[0].title).toContain("Honda");
      expect(result[1].title).toContain("Honda");
    });

    it("should filter by search term (model)", () => {
      const filters = { searchTerm: "Camry" };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain("Camry");
    });

    it("should filter by search term (year)", () => {
      const filters = { searchTerm: "2018" };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain("2018");
    });

    it("should filter by search term case-insensitively", () => {
      const filters = { searchTerm: "honda" };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(2);
    });

    it("should filter by minimum price", () => {
      const filters = { minPrice: "20000" };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(2);
      expect(result.every((car) => parsePrice(car.price) >= 20000)).toBe(true);
    });

    it("should filter by maximum price", () => {
      const filters = { maxPrice: "15000" };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(2);
      expect(result.every((car) => parsePrice(car.price) <= 15000)).toBe(true);
    });

    it("should filter by price range", () => {
      const filters = { minPrice: "10000", maxPrice: "20000" };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(2);
      expect(
        result.every(
          (car) =>
            parsePrice(car.price) >= 10000 && parsePrice(car.price) <= 20000
        )
      ).toBe(true);
    });

    it("should filter by maximum mileage", () => {
      const filters = { maxMileage: "50000" };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(3);
      expect(result.every((car) => parseMileage(car.miles) <= 50000)).toBe(
        true
      );
    });

    it("should apply multiple filters simultaneously", () => {
      const filters = {
        searchTerm: "Honda",
        maxPrice: "20000",
        maxMileage: "60000",
      };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(1);
      expect(result[0].title).toContain("Honda Accord");
    });

    it("should return empty array when no vehicles match filters", () => {
      const filters = {
        searchTerm: "Mercedes",
      };
      const result = filterInventory(mockInventory, filters);
      expect(result).toHaveLength(0);
    });

    it("should handle empty inventory array", () => {
      const filters = { searchTerm: "Honda" };
      const result = filterInventory([], filters);
      expect(result).toHaveLength(0);
    });
  });
});
