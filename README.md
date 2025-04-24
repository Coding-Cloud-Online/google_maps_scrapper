# Google Maps Scraper for Automotive Businesses

This project scrapes automotive-related business data (mechanic shops, car washes, auto parts stores, etc.) from Google Maps using the Google Places API. It gathers data such as name, address, coordinates, rating, phone number, and website, and saves the results to a JSON file.

## Features

- Searches multiple categories: 
  - Taller mecánico
  - Lavado de autos
  - Refaccionaria
  - Tienda automotriz
- Covers multiple geographic areas (Mexico City by default).
- Handles Google Maps API pagination automatically.
- Retrieves detailed contact information (phone, website) for each place.

## Requirements

- Node.js (v12 or higher recommended)
- A Google Cloud account with the **Places API** enabled.
- An active **Google Maps API Key** with Places API access.

## Setup

1. Clone this repository or download the files.
2. Install dependencies:
   ```bash
   npm install
¡Claro! Aquí tienes un **README.md** para tu proyecto, listo para usar en GitHub o cualquier repositorio.

---

```markdown
# Google Maps Scraper for Automotive Businesses

This project scrapes automotive-related business data (mechanic shops, car washes, auto parts stores, etc.) from Google Maps using the Google Places API. It gathers data such as name, address, coordinates, rating, phone number, and website, and saves the results to a JSON file.

## Features

- Searches multiple categories: 
  - Taller mecánico
  - Lavado de autos
  - Refaccionaria
  - Tienda automotriz
- Covers multiple geographic areas (Mexico City by default).
- Handles Google Maps API pagination automatically.
- Retrieves detailed contact information (phone, website) for each place.

## Requirements

- Node.js (v12 or higher recommended)
- A Google Cloud account with the **Places API** enabled.
- An active **Google Maps API Key** with Places API access.

## Setup

1. Clone this repository or download the files.
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a Google Cloud Project and enable the following API:
   - **Places API**
   
   Get your **API Key** from the Google Cloud Console: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)

4. Replace `'TU_API_KEY'` in `scraper.js` with your actual API Key.

## Running the Scraper

Run the script from the terminal:

```bash
node scraper.js
```

After completion, the script will generate a file called:

- `negocios_vehiculos_con_detalles.json`

This file contains an array of businesses with the following fields:
- `nombre`
- `direccion`
- `lat`
- `lng`
- `rating`
- `tipo`
- `zona`
- `telefono`
- `website`

## Customization

- You can modify the **locations** and **keywords** arrays in `scraper.js` to suit other regions or business categories.
- Add more fields from the Place Details API if needed: [Google Place Details Docs](https://developers.google.com/maps/documentation/places/web-service/details)

## Notes

- The script handles rate limits with short delays between requests.
- You have **$200 free monthly usage** from Google Cloud for Places API. Monitor your quota to avoid unexpected charges.

## License

This project is open-source and free to use for educational and personal purposes.

```

---

### ¿Quieres agregar algo más como instrucciones para CSV o algo específico para GitHub?