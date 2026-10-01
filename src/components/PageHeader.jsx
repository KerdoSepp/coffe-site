import { Link } from 'react-router-dom';

export default function PageHeader({ title, backTo = '/' }) {
  return (
    <header className="relative flex h-16 items-center justify-center px-5">
      <Link
        to={backTo}
        aria-label="Go back"
        className="absolute left-3 grid size-11 place-items-center rounded-full text-2xl font-light text-secondary transition hover:bg-surface hover:text-white"
      >
        ‹
      </Link>
      <h1 className="text-base font-semibold text-secondary">{title}</h1>
    </header>
  );
}
