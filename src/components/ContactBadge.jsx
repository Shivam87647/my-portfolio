export default function ContactBadge({ item, onCopyEmail, cardHoverProps }) {
  const content = (
    <>
      <div className="contact-badge-icon">{item.icon}</div>
      <div>
        <div className="contact-badge-lbl">{item.label}</div>
        <div className="contact-badge-val">{item.value}</div>
      </div>
    </>
  );

  if (item.action === 'copy-email') {
    return (
      <div
        className="contact-badge-item"
        style={{ cursor: 'pointer' }}
        onClick={onCopyEmail}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { onCopyEmail(e); } }}
        tabIndex={0}
        role="button"
        aria-label="Copy primary email to clipboard"
        {...cardHoverProps}
      >
        {content}
      </div>
    );
  }

  return (
    <a
      href={item.href}
      className="contact-badge-item"
      {...(item.external ? { target: '_blank' } : {})}
      {...cardHoverProps}
    >
      {content}
    </a>
  );
}
