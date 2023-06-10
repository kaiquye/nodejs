import { DtoAdapter } from "../../../domain/adapters/dto-adapter";
import { IPathsDto } from "../../../domain/interfaces/filters.interfaces";

function Run(target, value) {
  const keys = Object.getOwnPropertyNames(value);
  const instance = new target();

  for (let i = 0; i < keys.length; i++) {
    const existsProperty = instance[keys[i]];
    if (existsProperty) {
      instance[keys[i]] = value[keys[i]];
    }
  }

  return instance;
}

function DTOFilter<T extends DtoAdapter>(Dto: new () => T, path: IPathsDto) {
  return async (req, res) => {
    try {
      const body = req?.body;
      const param = req?.param;
      const query = req?.query;

      let DTO: DtoAdapter;
      switch (path) {
        case "BODY":
          DTO = Run(Dto, body);
          await DTO.isValid();
          break;
        case "PARAMS":
          DTO = Run(Dto, param);
          await DTO.isValid();
          break;
        case "QUERY":
          DTO = Run(Dto, query);
          await DTO.isValid();
          break;
        default:
          throw new Error("Invalid direct type.");
      }
    } catch (exception) {
      res.status(400).json({
        message: "invalid request",
        data: exception,
      });
    }
  };
}

export default DTOFilter;
