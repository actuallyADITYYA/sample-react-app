import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { TiWeatherDownpour, TiWeatherSunny } from "react-icons/ti";

interface WeatherCardProps {
  city: string;
  data?: WeatherData;
  loading: boolean;
  error: string;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ city, data, loading, error }) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3 flex-col">
        <h2 className="text-2xl font-bold">Weather</h2>
      </CardHeader>
      <Divider />
      {data && !error ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.city}</h1>
            {data.temperature > 20 ? (
              <div>
                <TiWeatherSunny className="w-36 h-36" />
              </div>
            ) : (
              <div>
                <TiWeatherDownpour className="w-36 h-36" />
              </div>
            )}
            <p className="text-3xl font-bold">{data.temperature}°C</p>
            <p className="text-lg">Humidity: {data.humidity}%</p>
            <p className="text-lg">Wind: {data.wind} km/h</p>
            <p className="text-lg">Rain: {data.rain} %</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">
              {loading ? "Loading..." : "Enter a city to see weather data"}
            </p>
          </div>
        </CardBody>
      )}
      <Divider />
      <CardFooter>
        <div className="flex flex-col items-left">
          {data && !loading && !error && (
            <p className="text-xs text-gray-600">Last update successful.</p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default WeatherCard;
