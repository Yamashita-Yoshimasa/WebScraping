/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React, { FC, useState, useEffect } from 'react';
import { GetNames, GetPrices, GetId } from './GetData';
import Home from '../components/Home';

const Scraping: FC = () => {
  const [names, setNames] = useState('loading...');
  const [prices, setPrices] = useState('loading...');
  const [id, setId] = useState('');
  const [gpuName, setGpu] = useState('loading...');
  const [gpuPrice, setGpuprice] = useState('loading...');
  const [gpuId, setGpuid] = useState('loading...');
  const [search, setSearch] = useState('1650');

  useEffect(() => {
    let nameResponse: any;
    let priceResponse: any;
    let idResponse: any;
    const main = async () => {
      nameResponse = await GetNames();
      priceResponse = await GetPrices();
      idResponse = await GetId();
    };

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    main().then(() => {
      nameResponse ? setNames(String(nameResponse.data)) : setNames('');
      priceResponse ? setPrices(String(priceResponse.data)) : setPrices('');
      idResponse ? setId(String(idResponse.data)) : setId('');
    });
  }, []);
  const HomeInput = (homeinput: string) => {
    setSearch(homeinput);
  };

  const len = names.length;
  let nameArray: string[] = [];
  let priceArray: string[] = [];
  let idArray: string[] = [];
  const searchGPU = Array(nameArray.length).fill('');
  // eslint-disable-next-line @typescript-eslint/require-await
  const CreateArray = async () => {
    nameArray = names.substring(2, len - 2).split('","');
    priceArray = prices.substring(2, len - 2).split('","');
    idArray = id.substring(2, len - 2).split('","');
  };
  const GpuSearch = () => {
    let noitemflag = true;
    for (let i = 0; i < nameArray.length; i++) {
      if (nameArray[i].includes(search)) {
        searchGPU[0] = nameArray[i];
        setGpu(searchGPU[0]);
        setGpuprice(priceArray[i]);
        setGpuid(idArray[i]);
        noitemflag = false;
        break;
      }
    }

    return noitemflag;
  };
  void CreateArray()
    .then(() => {
      GpuSearch();
    })
    .catch((error) => console.error(error));

  return (
    <Home
      names={gpuName}
      prices={gpuPrice}
      id={gpuId}
      HomeInput={HomeInput}
      GpuSearch={GpuSearch}
    />
  );
};

export default Scraping;
