document.addEventListener('DOMContentLoaded', () => {
    const BASE_URL = 'https://api.coingecko.com/api/v3';
  
    const getCoinsMarkets = async (currency = 'eur', limit = 10) => {
      const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=${limit}`);
      return response.json();
    };
  
    const getCoinById = async (id) => {
      const response = await fetch(`${BASE_URL}/coins/${id}`);
      return response.json();
    };
  
    const renderCoinsTable = async () => {
      const tableBody = document.querySelector('#coin-table tbody');
      const coins = await getCoinsMarkets();
  
      tableBody.innerHTML = coins.map(coin => `
        <tr data-id="${coin.id}">
          <td><img src="${coin.image}" alt="${coin.name}" width="32" height="32"></td>
          <td>${coin.name}</td>
          <td>${coin.symbol.toUpperCase()}</td>
          <td>€${coin.current_price}</td>
          <td>€${coin.high_24h}</td>
          <td>€${coin.low_24h}</td>
        </tr>
      `).join('');
  
      document.querySelectorAll('#coin-table tbody tr').forEach(row => {
        row.addEventListener('click', async (event) => {
          const coinId = event.currentTarget.getAttribute('data-id');
          const coinDetails = await getCoinById(coinId);
          renderCoinDetails(coinDetails);
        });
      });
    };
  
    const renderCoinDetails = (coin) => {
      const coinDetailsElement = document.getElementById('coin-details');
      coinDetailsElement.innerHTML = `
        <div class="coin-details">
          <h2>${coin.name} (${coin.symbol.toUpperCase()})</h2>
          <p><strong>Hashing Algorithm:</strong> ${coin.hashing_algorithm || 'N/A'}</p>
          <p><strong>Description:</strong> ${coin.description.en || 'N/A'}</p>
          <p><strong>Market Cap:</strong> €${coin.market_data.market_cap.eur}</p>
          <p><strong>Homepage:</strong> <a href="${coin.links.homepage[0]}" target="_blank">${coin.links.homepage[0]}</a></p>
          <p><strong>Genesis Date:</strong> ${coin.genesis_date || 'N/A'}</p>
        </div>
      `;
    };
  
    renderCoinsTable();
  });
  