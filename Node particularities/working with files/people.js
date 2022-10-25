const people = ["luigi", "stan", "who", "yamangora"];
const ages = [20, 23, 500, 43];

console.log("People module has been imported ", people);

module.exports = {
  people, //people: people
  ages,
};
