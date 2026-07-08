import { FormEvent, useState } from "react";
import { TextInput } from "../TextInput";
import { Button } from "../Button";
import styles from "./ManualLookupForm.module.css";

interface ManualLookupFormProps {
  onSearch: (query: string) => void;
}

export function ManualLookupForm({ onSearch }: ManualLookupFormProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <TextInput
        label="Name or reference code"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="e.g. Priya Sharma or REF-1234"
      />
      <Button type="submit" variant="primary" fullWidthMobile>
        Search
      </Button>
    </form>
  );
}
