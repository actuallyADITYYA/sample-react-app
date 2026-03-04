import "./App.css";
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import NavBar from "./components/NavBar";
import WeatherCard from "./components/WeatherCard";
import SeismicCard from "./components/SeismicCard";
import { getWeatherData, getSeismicData } from "./api/actions";

const App = () => {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData>();
  const [seismicData, setSeismicData] = useState<SeismicData>();
  const [error, setError] = useState("");

  const handleSearch = () => {
    if (!city.trim()) return;
    
    console.log("Fetching data for city:", city);
    setLoading(true);
    setError("");

    Promise.all([getWeatherData(city), getSeismicData(city)])
      .then(([weather, seismic]) => {
        setWeatherData(weather);
        setSeismicData(seismic);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div className="flex flex-col h-screen">
      <NavBar />
      <div className="flex flex-col flex-1 overflow-auto items-center justify-start gap-6 p-8 h-full w-full">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
          className="w-full max-w-md"
        >
          <div className="flex flex-col gap-4">
            <Input
              id="cityname"
              type="text"
              label="Enter City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="e.g., dublin"
            />
            <Button
              color="primary"
              isLoading={loading}
              type="submit"
              className="w-full"
            >
              Search
            </Button>
            {error && <p className="text-sm text-red-600">{error}</p>}
          </div>
        </form>

        {city && (
          <div className="flex flex-row gap-8 items-center justify-center">
            <WeatherCard city={city} data={weatherData} loading={loading} error={error} />
            <SeismicCard city={city} data={seismicData} loading={loading} error={error} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
