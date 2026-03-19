function Log({ logs }) {
  return (
    <section className="container">
      <h2>Battle Log</h2>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            <span style={{ color: log.isPlayer ? "blue" : "orange" }}>
              {log.isPlayer ? "Player " : "Monster "}
            </span>
            <span style={{ color: log.isDamage ? "red" : "green" }}>
              {log.text}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Log;