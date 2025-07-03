import qs from "qs";
import { useLocation, useNavigate } from "react-router-dom";

type TDynamic = string | number | boolean | object | undefined;
export type TObject<T = TDynamic> = Record<string, T>;

export const useQueryParams = () => {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();

  const getQueryParams = (excludeKeys: string[] = []): TObject => {
    const queryParams = qs.parse(search, { ignoreQueryPrefix: true });
    const excludedKeysSet = new Set(excludeKeys);

    return Object.keys(queryParams).reduce((filteredParams, key) => {
      if (!excludedKeysSet.has(key)) {
        filteredParams[key] = queryParams[key]!;
      }
      return filteredParams;
    }, {} as TObject);
  };

  const setQueryParams = (newQuery: TObject): void => {
    const queryString = qs.stringify(newQuery, { arrayFormat: "repeat" });
    navigate(`${pathname}?${queryString}`);
  };

  return {
    getQueryParams,
    setQueryParams,
  };
};
