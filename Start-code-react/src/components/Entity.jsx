function Entity({ name, hp }) {
  return (
    <section className="container">
      <h2>{name}</h2>
      <div className="healthbar">
        <div
          className="healthbar__value"
          style={{ width: `${hp}%` }}
        ></div>
      </div>
    </section>
  );
}

export default Entity;