type Props = {
  label: string;
};

export function DocHeader({ label }: Props) {
  return <p className="g-doc-header">{label}</p>;
}
