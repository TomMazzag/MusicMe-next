import { faClock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function UpcomingRelease() {
    return (
      <div className="w-30 h-30 bg-base-300 rounded-md flex flex-col justify-center items-center">
        <h3 className="text-xl">Upcoming</h3>
        <h3 className="text-xl">release</h3>
        <FontAwesomeIcon icon={faClock} color="#00cdb7" className="mt-2"/>
      </div>
    );
};
