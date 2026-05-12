import { ReactNode } from "react";
import { ImageTile } from "../page";

export default function FutureGoals() {
  return (
    <div className="p-4 md:grid md:grid-cols-2 flex-1">
      <TextTile title="Future goals">
        <p>As mentioned above we will be happy to listen to any product requests from users</p>
        <br />
        <p>Some of the goals we already have planned are:</p>
        <ul className="ml-3 list-disc">
          <li>Support for apple music</li>
          <li>Greater profile analytics</li>
          <li>Song suggestions using AI/ML</li>
        </ul>
      </TextTile>
      <ImageTile src={'/discover.webp'} width={3802} height={1064} />
    </div>
  );
}

interface TextTileProps {
  title: string;
  children?: ReactNode;
}

const TextTile = ({ title, children }: TextTileProps) => {
  return (
    <div className="bg-base-300 px-10 py-6 rounded-xl md:mx-14 my-6">
      <h1 className="text-accent text-3xl mb-2">{title}</h1>
      {children}
    </div>
  );
};
