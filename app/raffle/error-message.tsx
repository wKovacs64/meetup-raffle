export default function ErrorMessage({
  title,
  subtitle,
  problemText,
}: ErrorMessageProps) {
  return (
    <section>
      <span className="text-xl font-bold">{title}</span>
      <p className="my-4">{subtitle}</p>
      <p className="my-4 bg-accent p-2 font-mono text-white">{problemText}</p>
    </section>
  );
}

interface ErrorMessageProps {
  title: string;
  subtitle: string;
  problemText: string;
}

ErrorMessage.defaultProps = {
  title: 'Oops!',
  subtitle: 'An error was encountered:',
  problemText: 'Unknown.',
};
