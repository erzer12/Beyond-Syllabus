"use client";
import { useState, useEffect } from "react";
import styles from './ModelSelector.module.css';

interface Model {
  id: string;
  name: string;
}

const models: Model[] = [
  { id: "openai/gpt-oss-120b", name: "GPT 5" },

  { id: "openai/gpt-oss-20b", name: "GPT 4.1" },
  {
    id: "meta-llama/llama-3.3-70b-versatile",
    name: "LLaMA 3",
  },
];

interface ModelSelectorProps {
  onModelChange: (modelId: string) => void;
}

export default function ModelSelector({ onModelChange }: ModelSelectorProps) {
  const [selectedModel, setSelectedModel] = useState(models[0].id);

  useEffect(() => {
    const saved = localStorage.getItem("selectedModel");
    if (saved && models.find((m) => m.id === saved)) {
      setSelectedModel(saved);
      onModelChange(saved);
    }
  }, []);

  const handleChange = (value: string) => {
    setSelectedModel(value);
    localStorage.setItem("selectedModel", value);
    onModelChange(value);
  };

  return (
    <div className={styles.modelContainer}>
      <span className={styles.label}>Model</span>
      <div className={styles.selectWrapper}>
        <select
          value={selectedModel}
          onChange={(e) => handleChange(e.target.value)}
          className={styles.select}
        >
          {models.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
    </div>

  );
}
