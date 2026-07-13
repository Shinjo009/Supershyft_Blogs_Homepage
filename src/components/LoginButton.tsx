import './LoginButton.css'

const LOGIN_URL = import.meta.env.VITE_NAV_LOGIN?.trim() || 'https://app.supershyft.com/login'

type Props = {
  onClick?: () => void
}

export function LoginButton({ onClick }: Props) {
  return (
    <a
      className="login-btn"
      href={LOGIN_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={onClick}
    >
      Login
    </a>
  )
}
