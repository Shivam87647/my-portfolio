export default function SectionHeader({ subtitle, title, titleHighlight }) {
  return (
    <>
      <span className="section-subtitle">
        <span>{'\u2726'}</span> {subtitle}
      </span>
      <h2 className="section-title">{title} <span className="editorial-title">{titleHighlight}</span></h2>
    </>
  );
}
