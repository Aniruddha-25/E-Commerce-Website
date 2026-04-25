const footerColumns = [
  {
    title: 'online store',
    links: ['men clothing', 'women clothing', 'men accessories', 'women accessories'],
  },
  {
    title: 'helpful links',
    links: ['home', 'about', 'contact'],
  },
  {
    title: 'partners',
    links: ['zara', 'pantaloons', 'levis', 'ucb', '+ many more'],
  },
  {
    title: 'address',
    links: ['building 101', 'central avenue', 'la - 902722', 'united states'],
  },
] as const

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/Aniruddha-25",
    iconClass: "fa-brands fa-github",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/urstruly_aniruddha",
    iconClass: "fa-brands fa-instagram",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/aniruddha-salvankar-193642264/",
    iconClass: "fa-brands fa-linkedin",
  },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        {footerColumns.map((column) => (
          <section key={column.title}>
            <h3>{column.title}</h3>
            {column.links.map((link) => (
              <p key={link}>{link}</p>
            ))}
          </section>
        ))}
      </div>
      <div className="site-footer__bottom">
        <p className="site-footer__credit">&copy; Aniruddha Salvankar</p>
        <div className="site-footer__social" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="site-footer__social-link"
              aria-label={`Open ${link.name}`}
            >
              <i className={link.iconClass} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
