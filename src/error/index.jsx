import { Link, useLocation } from 'react-router';

export function ErrorGuessingNotAvailableYet() {
  return (
    <>
      <h2>Tippingen er snart tilgjenglig...</h2>
      <Link to="/">Tilbake til hjem</Link>
    </>
  )
}

export function ErrorNotAdmin() {
  return (
    <>
      <h2>Du trenger administrator tilgang for å bruke denne siden...</h2>
      <Link to="/">Tilbake til hjem</Link>
    </>
  )
}

export function ErrorNotFound() {
  return (
    <>
      <h2>Beklager, vi kunne ikke finne siden du lette etter...</h2>
      <p>
        Hvis du mener det er en feil, vennligst meld det inn <Link to="/contact">her</Link>.
      </p>
      <Link to="/">Tilbake til hjem</Link>
    </>
  )
}

export function ErrorNotLoggedIn() {
  const { pathname } = useLocation();
  function login() {
    localStorage.setItem("redirectAfterLogin", pathname);
    window.location.href = "/oauth2/authorization/google";
  }
  return (
    <>
      <h2>Du må være logget inn for å bruke denne siden...</h2>
      <Link onClick={login}>Logg inn</Link>
    </>
  )
}

export function ErrorNoUsername() {
  return (
    <>
      <h2>Du må ha laget et brukernavn for å bruke denne siden...</h2>
      <Link to="/settings/username">Velg brukernavn</Link>
    </>
  )
}

export function ErrorUnknown() {
  return (
    <>
      <h2>Det oppstod en ukjent feil...</h2>
      <p>
        Hvis feilen vedvarer, vennligst meld det inn <Link to="/contact">her</Link>.
      </p>
      <Link to="/">Tilbake til hjem</Link>
    </>
  )
}
