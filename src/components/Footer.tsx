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
      <p className="site-footer__credit">aniruddha salvankar</p>
    </footer>
  )
}
