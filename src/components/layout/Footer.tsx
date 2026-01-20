import Container from "./Container";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--border)" }}>
      <Container>
        <div style={{ padding: "18px 0" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "space-between" }}>
            <small className="muted">
              © {new Date().getFullYear()} 3A Agency — Automation • AI • Agents
            </small>
            <small className="muted">
              Germany (DACH) • EU-first • Audit-ready
            </small>
          </div>
        </div>
      </Container>
    </footer>
  );
}
