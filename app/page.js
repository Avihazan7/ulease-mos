/* ULease 🎯 — Deal Score API status page.
   Ultra Azure design language (mirrors leasing-api/public/ulease-design-system.css):
   calm white canvas, azure crystal, layered 3D shadows (contact + key + ambient),
   one brand hue. Static, dependency-free, deterministic — nothing here computes. */

const css = `
  :root {
    --azure-50: #eff7ff;
    --azure-100: #dbeeff;
    --azure-300: #93c8ff;
    --azure-400: #60a5fa;
    --azure-500: #3b82f6;
    --azure-600: #2563eb;
    --azure-800: #1e40af;
    --slate-900: #0f172a;
    --slate-600: #475569;
    --slate-500: #64748b;
    --slate-200: #e2e8f0;
    --elev-rest:
      0 1px 2px rgba(15, 23, 42, .06),
      0 8px 20px -14px rgba(37, 99, 235, .14),
      0 20px 54px -28px rgba(37, 99, 235, .22);
    --bevel: inset 0 1px 0 rgba(255, 255, 255, .65);
  }
  * { box-sizing: border-box; }
  body {
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    color: var(--slate-900);
    background:
      radial-gradient(circle at 18% 0%, rgba(96, 165, 250, .14), transparent 32rem),
      radial-gradient(circle at 82% 8%, rgba(147, 200, 255, .12), transparent 34rem),
      linear-gradient(180deg, #ffffff 0%, #f8fbff 100%);
    min-height: 100vh;
  }
  .wrap {
    max-width: 640px;
    margin: 0 auto;
    padding: clamp(48px, 10vh, 120px) 24px 64px;
  }
  .card {
    position: relative;
    overflow: hidden;
    border-radius: 32px;
    padding: clamp(28px, 5vw, 44px);
    background: rgba(255, 255, 255, .82);
    border: 1px solid rgba(226, 232, 240, .78);
    box-shadow: var(--bevel), var(--elev-rest);
  }
  .mark {
    width: 56px; height: 56px; border-radius: 50%;
    display: grid; place-items: center;
    background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 55%, #60a5fa 100%);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .35),
                0 14px 34px -14px rgba(37, 99, 235, .65);
    margin-bottom: 22px;
  }
  .mark span {
    width: 22px; height: 22px; border-radius: 50%;
    border: 5px solid #fff;
  }
  h1 { margin: 0 0 6px; font-size: clamp(1.5rem, 4vw, 2rem); letter-spacing: -.02em; }
  .sub { margin: 0; color: var(--slate-600); line-height: 1.6; }
  .chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 26px; }
  .chip {
    display: inline-flex; align-items: center; gap: 6px;
    border-radius: 999px; padding: 5px 13px;
    font-size: .78rem; font-weight: 800;
    background: var(--azure-50); color: var(--azure-800);
    border: 1px solid var(--azure-100);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, .8);
  }
  .chip .dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: #16a34a;
    box-shadow: 0 0 0 3px rgba(22, 163, 74, .15);
  }
  .rule {
    height: 1px; border: 0; margin: 26px 0;
    background: linear-gradient(90deg, transparent, var(--azure-300) 30%, var(--azure-300) 70%, transparent);
  }
  .doctrine { margin: 0; color: var(--slate-500); font-size: .85rem; line-height: 1.7; }
  .doctrine b { color: var(--azure-800); }
  .foot { margin-top: 28px; text-align: center; color: var(--slate-500); font-size: .78rem; }
`;

export default function Page() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <main className="wrap">
        <div className="card">
          <div className="mark" aria-hidden="true"><span /></div>
          <h1>ULease Deal Score API</h1>
          <p className="sub">
            The deterministic decision engine behind the ULease marketplace.
            Transparent scoring — same input, same output, every time.
          </p>
          <div className="chips">
            <span className="chip"><span className="dot" aria-hidden="true" />Phase 1 · Deterministic Engine — Active</span>
            <span className="chip">OS U.M.M Kernel</span>
          </div>
          <hr className="rule" />
          <p className="doctrine">
            <b>Doctrine:</b> pure engines, no side effects — timestamps and I/O are
            injected by the host. The algorithm&apos;s single source of truth lives in
            the <b>@ulease/core</b> constitution.
          </p>
        </div>
        <p className="foot">ULease 🎯 · Leasing.co.il ✍️ · ezEro.co.il 🧿</p>
      </main>
    </>
  );
}
