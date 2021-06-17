import { useQuery } from "@apollo/client";
import { get } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { CharactersQuery } from "../generated";
import { CHARACTERS_QUERY } from "../graphql/queries";
import withApollo from "../lib/withApollo";

function Home() {
  // const { data } = useCharactersQuery();

  const { data } = useQuery(CHARACTERS_QUERY);

  const characters = get(
    data,
    "characters.results",
    []
  ) as CharactersQuery["characters"]["results"];

  return (
    <div>
      {characters.map((character) => (
        <div key={character.id}>
          <Image
            src={character.image}
            alt={character.name}
            width="200px"
            height="200px"
          />
          <Link href="/characters/[id]" as={`/characters/${character.id}`}>
            {character.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default withApollo(Home); //getDataFromTree
