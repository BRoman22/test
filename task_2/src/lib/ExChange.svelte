<script lang="ts">
  import useApi from '../hooks/useApi.ts'
  const { getUsdRate, updateRate } = useApi();

  let currencyNameMain = "USD";
  let currencyNameSecond = "RUB";
  let currencyValueMain = 1;
  let currencyValueSecond;
  let rate;
  let options = [];

  const rounded = (item) => (item).toFixed(2);
  
  getUsdRate(currencyNameSecond).then(({ currencyNames, course }) => {
    options = currencyNames;
    rate = course;
    currencyValueSecond = rounded(currencyValueMain * rate)
  })
  const setCurrencyValueMain = (event) => {
    currencyValueMain = event.target.value;
    currencyValueSecond = rounded(currencyValueMain * rate);
  }
  const setCurrencyValueSecond = (event) => {
    currencyValueSecond = event.target.value;
    currencyValueMain = rounded(currencyValueSecond / rate);
  }
  const setCurrencyNameMain = (event) => {
    currencyNameMain = event.target.value;
    updateRate(event.target.value, currencyNameSecond).then((course) => {
      rate = course;
      currencyValueMain = rounded(currencyValueSecond / rate)
    })
  }
  const setCurrencyNameSecond = (event) => {
    currencyNameSecond = event.target.value;
    updateRate(currencyNameMain, event.target.value).then((course) => {
      rate = course;
      currencyValueSecond = rounded(currencyValueMain * rate)
    })
  }
</script>

<input type="number" bind:value={currencyValueMain} on:input={setCurrencyValueMain} />
<select bind:value={currencyNameMain} on:change={setCurrencyNameMain}>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>
<input type="number" bind:value={currencyValueSecond} on:input={setCurrencyValueSecond} />
<select bind:value={currencyNameSecond} on:change={setCurrencyNameSecond}>
    {#each options as option}
        <option value={option}>{option}</option>
    {/each}
</select>