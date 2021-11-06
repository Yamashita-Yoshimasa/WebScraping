const Config = () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      restful: {
        apiURL: process.env.REACT_APP_DEV_URL,
      },
    };
  }
};
export const restfulApiConfig = Config().restful;
