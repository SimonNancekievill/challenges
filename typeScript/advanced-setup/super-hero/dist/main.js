import MarvelData from "./superheroes.json" with { type: "json" };
function logSuperheroCount(data) {
    const count = data.superheroes.length;
    console.log(`--- Marvel Data Summary ---`);
    console.log(`Total Superheroes Found: ${count}`);
    console.log(`---------------------------`);
}
logSuperheroCount(MarvelData);
