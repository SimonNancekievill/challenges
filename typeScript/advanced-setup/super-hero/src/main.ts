import MarvelData from "./superheroes.json" with { type: "json" };

interface SuperheroData {
  superheroes: string[];
}

function logSuperheroCount(data: SuperheroData): void {
  const count = data.superheroes.length;

  console.log(`--- Marvel Data Summary ---`);
  console.log(`Total Superheroes Found: ${count}`);
  console.log(`---------------------------`);
}

logSuperheroCount(MarvelData);
