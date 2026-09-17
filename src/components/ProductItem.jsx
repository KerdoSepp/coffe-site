export default function ProductItem(props) {
  return (
    <section className="flex w-full items-center text-primary">
      <img
        src={searchIcon}
        alt=""
        aria-hidden="true"
        className="h-[34px] w-7 shrink-0"
      />
      <h2>Caffe Mocha</h2>
      <h3>Deep Foam</h3>
      <h3>4,53 €</h3>
    </section>
  );
}
