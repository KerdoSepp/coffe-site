import locationIcon from '../assets/LocationIcon.svg';

export default function Location() {
  return (
    <section className="text-primary">
      <div className="flex items-center gap-2">
        <img
          src={locationIcon}
          alt=""
          aria-hidden="true"
          className="h-[17px] w-auto shrink-0"
        />
        <h2 className="text-[14px] leading-none font-semibold">Kohtu tn 22</h2>
      </div>
      <p className="mt-3 text-[12px] leading-none text-secondary">
        Kuressaare 93812
      </p>
    </section>
  );
}
