export function getScoreColour(score) {
  return "hsl(" + score * 500 + ", 100%, 50%)";
}

export function sortCompanies(a,b) {
  const nameA = a.name.toLocaleLowerCase();
  const nameB = b.name.toLocaleLowerCase();

  if ( nameA < nameB ) return -1;
  if ( nameA > nameB ) return 1;
  return 0;
}

export function scoreSort(a,b){
  return b.score - a.score;
}
