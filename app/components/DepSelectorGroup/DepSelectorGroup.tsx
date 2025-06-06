import { DepTitleEnum } from '@/app/enums/DepEnums';
import { DepSelect, DepSelectMapType } from '@/app/interfaces/Dep';
import DepSelector from './DepSelector';
interface DepSelectorGroupProps {
  depList: DepSelect[];
  depSelectMap: DepSelectMapType;
  onSetDepSelectMapAction: (dep: DepTitleEnum, newSelected: number) => void;
}
export default function DepSelectorGroup({ depList, depSelectMap, onSetDepSelectMapAction }: DepSelectorGroupProps) {
  return (
    <div>
      {depList.map((dep, index) => (
        <DepSelector key={index} title={dep.title} deps={dep.deps} depSelectMap={depSelectMap} onSetDepSelectMapAction={(dep, newSelected) => onSetDepSelectMapAction(dep, newSelected)} />
      ))}
    </div>
  );
}
