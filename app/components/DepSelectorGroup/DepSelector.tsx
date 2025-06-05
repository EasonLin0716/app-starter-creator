'use client';
import { Dep, DepSelectMapType, DepTitleEnum } from '@/app/interfaces/Dep';
import { useMemo, useState } from 'react';
interface DepSelectorProps extends Dep {
  depSelectMap: DepSelectMapType;
  onSetDepSelectMapAction: (dep: DepTitleEnum, newSelected: number) => void;
}

export default function DepSelector({ title, deps, depSelectMap, onSetDepSelectMapAction }: DepSelectorProps) {
  const [close, setClose] = useState(true);
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
        <label key={d} className="flex gap-1">
          <input
            type="radio"
            checked={depSelectMap[title] === index}
            name={title.replaceAll(' ', '-').toLowerCase()}
            onChange={() => {
              onSetDepSelectMapAction(title, index);
            }}
          />
          <span>{d}</span>
        </label>
      ))}
    </div>
  );
}
