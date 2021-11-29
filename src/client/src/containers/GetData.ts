/* eslint-disable no-unused-expressions */
/* eslint-disable no-void */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

export const GetNames = async () => {
  let nameResponse: any;
  try {
    nameResponse = await axios.get(
      'https://gpuscraping.de.r.appspot.com/pckoubou/names',
      {
        proxy: {
          host: 'https://gpuscraping.de.r.appspot.com',
          port: 8081,
        },
      },
    );
    if (nameResponse.data.length === 2) {
      throw new RangeError('blank');
    }
  } catch (error) {
    console.error(error);
  } finally {
    return nameResponse;
  }
};

export const GetPrices = async () => {
  let priceResponse: any;
  try {
    priceResponse = await axios.get(
      'https://gpuscraping.de.r.appspot.com/pckoubou/prices',
      {
        proxy: {
          host: 'https://gpuscraping.de.r.appspot.com',
          port: 8081,
        },
      },
    );
    if (priceResponse.data.length === 2) {
      console.log(priceResponse);
      throw new RangeError('blank');
    }
  } catch (error) {
    console.error(error);
  } finally {
    return priceResponse;
  }
};

export const GetId = async () => {
  let idResponse: any;
  try {
    idResponse = await axios.get(
      'https://gpuscraping.de.r.appspot.com/pckoubou/id',
      {
        proxy: {
          host: 'https://gpuscraping.de.r.appspot.com',
          port: 8081,
        },
      },
    );
    if (idResponse.data.length === 2) {
      console.log(idResponse);
      throw new RangeError('blank');
    }
  } catch (error) {
    console.error(error);
  } finally {
    return idResponse;
  }
};
