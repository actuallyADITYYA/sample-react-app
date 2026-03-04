import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@nextui-org/react";
import { LiaAccessibleIcon } from "react-icons/lia";

interface SeismicCardProps {
  city: string;
  data?: SeismicData;
  loading: boolean;
  error: string;
}

const SeismicCard: React.FC<SeismicCardProps> = ({ city, data, loading, error }) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3 flex-col">
        <h2 className="text-2xl font-bold">Seismic</h2>
      </CardHeader>
      <Divider />
      {data && !error ? (
        <CardBody>
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold">{data.id}</h1>
            <div>
              <LiaAccessibleIcon className="w-36 h-36" />
            </div>
            <p className="text-3xl font-bold">{data.magnitute} Magnitude</p>
            <p className="text-lg">Latitude: {data.latitude}°</p>
            <p className="text-lg">Longitude: {data.longitude}°</p>
          </div>
        </CardBody>
      ) : (
        <CardBody>
          <div className="flex flex-col items-center">
            <p className="text-xl font-bold">
              {loading ? "Loading..." : "Enter a city to see seismic data"}
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

export default SeismicCard;
