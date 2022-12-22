import { useState } from "react";
//taking requestconfig to config fetch and a fuch to pass data to that function
const useHttp = (requestConfig, applydataFun) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async () => {
    try {
      setIsLoading(true);
      setError(null);
      let res;

      //request

      res = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET",
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : {},
        headers: requestConfig.headers ? requestConfig.headers : null,
      });

      //checking for response
      if (!res.ok) {
        throw new Error("SomeThing Went Wrong");
      }
      const data = await res.json();
      //passing data to this function so this function do whatever it need whith that data
      applydataFun(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  return [isLoading, error, sendRequest];
};

export default useHttp;
