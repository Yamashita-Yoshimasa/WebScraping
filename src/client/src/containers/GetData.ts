/* eslint-disable no-unused-expressions */
/* eslint-disable no-void */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unsafe-finally */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios';

let c1 = 0;
let c2 = 0;
let c3 = 0;

export const GetNames = async () => {
  let nameResponse: any;
  try {
    nameResponse = await axios.get('/pckoubou/names', {
      proxy: {
        host: 'localhost',
        port: 5000,
      },
    });
    if (nameResponse.data.length === 2) {
      throw new RangeError('blank');
    }
  } catch (error) {
    console.error(error);
    c1 <= 5
      ? (c1 += 1) && void GetNames()
      : console.error('namesデータを取得できません。');
  } finally {
    return nameResponse;
  }
};

export const GetPrices = async () => {
  let priceResponse: any;
  try {
    priceResponse = await axios.get('/pckoubou/prices', {
      proxy: {
        host: 'localhost',
        port: 5000,
      },
    });
    if (priceResponse.data.length === 2) {
      console.log(priceResponse);
      throw new RangeError('blank');
    }
  } catch (error) {
    console.error(error);
    c2 <= 5
      ? (c2 += 1) && void GetPrices()
      : console.error('pericesデータを取得できません。');
  } finally {
    return priceResponse;
  }
};

export const GetId = async () => {
  let idResponse: any;
  try {
    idResponse = await axios.get('/pckoubou/id', {
      proxy: {
        host: 'localhost',
        port: 5000,
      },
    });
    if (idResponse.data.length === 2) {
      console.log(idResponse);
      throw new RangeError('blank');
    }
  } catch (error) {
    c3 <= 5
      ? (c3 += 1) && void GetId()
      : console.error('idデータを取得できません。');
  } finally {
    return idResponse;
  }
};
