import { Dep } from '../interfaces/Dep';

export const getJSONKeyValueStringByDep = (dep: Dep): string => `"${dep.name}": "${dep.version}"`;

export const makeJSONDepAndDevDeps = (depList: Dep[]): string => {
  const normalDepList = depList.filter((d) => !d.isDevDep);
  const devDepList = depList.filter((d) => d.isDevDep);
  const depString = normalDepList.length
    ? `"dependencies": {
    ${normalDepList
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((d) => {
        return getJSONKeyValueStringByDep(d);
      })
      .join(',\n    ')}
  },\n`
    : '';

  const devDepString = devDepList.length
    ? `"devDependencies": {
    ${devDepList
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((d) => {
        return getJSONKeyValueStringByDep(d);
      })
      .join(',\n    ')}
  }`
    : '';

  return depString + (depString ? '  ' + devDepString : devDepString);
};
