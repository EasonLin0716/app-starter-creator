interface ToolSelectorProps {
  tools: readonly string[];
  selectedToolIndex: number;
  setSelectedToolIndex: (index: number) => void;
}

export default function ToolSelector({ tools, selectedToolIndex, setSelectedToolIndex }: ToolSelectorProps) {
  return (
    <div className="flex gap-5">
      {tools.map((t, index) => (
        <label key={t} className="flex gap-1">
          <input type="radio" checked={index === selectedToolIndex} name="build-tool" onChange={() => setSelectedToolIndex(index)} />
          <span>{t}</span>
        </label>
      ))}
    </div>
  );
}
