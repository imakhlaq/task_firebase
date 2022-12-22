import { useCallback, useState } from "react";
//taking requestconfig to config fetch and a fuch to pass data to that function
const useHttp = (applydataFun) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (requestConfig) => {
      try {
        setIsLoading(true);
        setError(null);

        //request

        const res = await fetch(requestConfig.url, {
          method: requestConfig.method ? requestConfig.method : "GET",
          body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          headers: requestConfig.headers ? requestConfig.headers : {},
        });

        //checking for response
        if (!res.ok) {
          throw new Error("SomeThing Went Wrong");
        }
        const data = await res.json();

        //passing data to this function so this function do whatever it need whith that data
        applydataFun(data, requestConfig.text ? requestConfig.text : null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [applydataFun]
  );
  return [isLoading, error, sendRequest];
};

export default useHttp;
