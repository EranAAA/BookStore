const { Link, NavLink, withRouter } = ReactRouterDOM;

export function AppHeader(props) {
  return (
    <header className='app-header'>
      <h3 /*onClick={() => props.history.goBack()}*/>Book App</h3>
      <nav>
        <NavLink to="/" >Home</NavLink>
        <NavLink to="/book" exact>Books</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}

// export const AppHeader = withRouter(_AppHeader)
