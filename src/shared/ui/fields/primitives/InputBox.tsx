type Props = { children: React.ReactNode };

export function InputBox({ children }: Props) {
  return <div className="flex flex-col gap-1 w-full">{children}</div>;
}
