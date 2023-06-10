import { CreateUniversityDto } from "./create-university.dto";

describe("create university dto", function () {
  test("should create a new instance", function () {
    const dto = new CreateUniversityDto();
    dto.name = "example";
    dto.country = "example";
    dto.countryCode = "EX";
    dto.domain = ["example"];
    dto.webPages = ["example"];

    expect(dto.name).toEqual("example");
    expect(dto.country).toEqual("example");
    expect(dto.countryCode).toEqual("EX");
  });

  test("should return invalid length countryCode", async function () {
    try {
      const dto = new CreateUniversityDto();
      dto.name = "example";
      dto.country = "example";
      dto.countryCode = "INVALID LENGTH CODE ";
      dto.domain = ["example"];
      dto.webPages = ["example"];

      await dto.isValid();
    } catch (exception) {
      const error = exception[0].constraints;
      expect(error).toEqual({ isString: "stateProvince must be a string" });
    }
  });
});
