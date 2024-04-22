const useApi = () => {
  const TOKEN = 'e0f69b61a22dab476d12c576';
  const BASE_URL = 'https://v6.exchangerate-api.com/v6';

  const getUsdRate = async (currencyName: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${TOKEN}/latest/USD`);
      const json = await response.json();
      const conversionRates = json.conversion_rates;
      const currencyNames = Object.keys(conversionRates);
      const course = conversionRates[currencyName];
      return { currencyNames, course };
    } catch (error) {
      console.log('Ошибка при запросе getUsdRate: ', error);
    }
  }

  const updateRate = async (currency1: string, currency2: string) => {
    try {
      const response = await fetch(`${BASE_URL}/${TOKEN}/pair/${currency1}/${currency2}`);
      const json = await response.json();
      return json.conversion_rate;
    } catch (error) {
      console.log('Ошибка при запросе updateRate: ', error);
    }
  }

  return { getUsdRate, updateRate };
}

export default useApi;