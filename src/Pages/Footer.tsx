function Footer() {
  return (
    <footer
      data-testid="footer"
      style={ {
        position: 'fixed',
        bottom: '0',
        width: '100%',
      } }
    >
      <a href="/drinks">
        <img
          src="/src/images/drinkIcon.svg"
          alt="Bebida"
          data-testid="drinks-bottom-btn"
        />
      </a>
      <a href="/meals">
        <img
          src="/src/images/mealIcon.svg"
          alt="Comida"
          data-testid="meals-bottom-btn"
        />
      </a>
    </footer>
  );
}
export default Footer;
