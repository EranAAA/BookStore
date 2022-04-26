const { Link } = ReactRouterDOM;

export function BookPreview({ book }) {
  
  let priceWithCurrency;
  switch (book.listPrice.currencyCode) {
    case "ILS":
      priceWithCurrency = `${book.listPrice.amount} ₪`;
      break;
    case "USD":
      priceWithCurrency = `$ ${book.listPrice.amount}`;
      break;
    case "EUR":
      priceWithCurrency = `${book.listPrice.amount} €`;
      break;
  }

  return (
    <Link to={`/book/${book.id}`} style={{textDecoration: 'none'}}>
      <article className='book-preview'>
        <h2>{book.title}</h2>
        <div className='image'>
          <img src={book.thumbnail} alt='' />
        </div>
        <h3>{priceWithCurrency}</h3>
      </article>
    </Link>
  );
}

// only one book can be selected?
// Every list need to be seperated? list/ul
// put getcurrencyIcon() logic in function with switch
