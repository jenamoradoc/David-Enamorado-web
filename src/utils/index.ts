import { FetchResponse, LoginResults } from "../interfaces";

interface GetDataFunctionParams {
  login: string;
  page?: number;
  setLoading: (state: boolean) => void;
  getResults: (data: LoginResults[]) => void;
  setMessage: (message: string) => void;
  sort?: string;
}

export const getDataFn = async ({
  login,
  page = 1,
  setLoading,
  getResults,
  setMessage,
  sort = "best match",
}: GetDataFunctionParams): Promise<void> => {
  try {
    setLoading(true);

    const apiUrl: string = `https://api.github.com/search/users?q=${login}&per_page=9&page=${page}&sort=${sort}`;
    const response: Response = await fetch(apiUrl);
    const { items: results }: FetchResponse = await response.json();

    if (results) {
      getResults(results);
      setLoading(false);
    } else {
      setMessage("Something went wrong, try again!");
      setLoading(false);

      setTimeout(() => setMessage(""), 3000);
    }
  } catch {
    setMessage("Server error!");
    setLoading(false);

    setTimeout(() => setMessage(""), 3000);
  }
};
