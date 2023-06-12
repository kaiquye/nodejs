import { ListAllUniversityDto } from '../list-all-university.dto';

describe('create university dto', function () {
  test('should create a new instance', function () {
    const dto = new ListAllUniversityDto();
    dto.perPage = 1;
    dto.country = 'brazil';

    expect(dto.perPage).toEqual(1);
    expect(dto.country).toEqual('brazil');
  });

  test('should return invalid length countryCode', async function () {
    try {
      const dto = new ListAllUniversityDto();
      dto.perPage = 1;

      await dto.isValid();
    } catch (exception) {
      const error = exception[0].constraints;
      expect(error).toEqual({ isNotEmpty: 'country should not be empty' });
    }
  });
});
