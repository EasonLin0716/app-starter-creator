'use client';
import { DepTitleEnum } from '@/app/enums/DepEnums';
import { DepSelect, DepSelectMapType } from '@/app/interfaces/Dep';
import { useMemo, useState } from 'react';
interface DepSelectorProps extends DepSelect {
  depSelectMap: DepSelectMapType;
  onSetDepSelectMapAction: (dep: DepTitleEnum, newSelected: number) => void;
}

export default function DepSelector({ title, deps, depSelectMap, onSetDepSelectMapAction }: DepSelectorProps) {
  const [close, setClose] = useState(title !== DepTitleEnum.mainLibrary);
  const getWrapperClassName = useMemo(() => {
    const base = ['inline-flex', 'flex-col', 'overflow-hidden'];
    if (close) base.push('h-24px');
    return base.join(' ');
  }, [close]);
  return (
    <div className={getWrapperClassName}>
      <button onClick={() => setClose(!close)}>
        {close ? '+' : '-'} {title}
      </button>
      {deps.map((d, index) => (
        <label key={d.name} className="flex gap-1">
          <input
            type="radio"
            checked={depSelectMap[title] === index}
            name={title.replaceAll(' ', '-').toLowerCase()}
            onChange={() => {
              onSetDepSelectMapAction(title, index);
            }}
          />
          <span>{d.name}</span>
        </label>
      ))}
    </div>
  );
}
