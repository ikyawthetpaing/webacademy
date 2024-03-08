interface Props {
  children: React.ReactNode;
}

export default function OthersLayout({ children }: Props) {
  return <div className="mt-16">{children}</div>;
}
