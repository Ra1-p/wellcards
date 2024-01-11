import "./Logo.scss";
import logo from '../../assets/logo.svg'

export default function Logo() {
  return (
    <div className='logo'>
      <img className='logo__img' src={logo} />
      <h1 className='logo__title'>WELLCARDS</h1>
      <p className='logo__description'>
        Virtual debit cards and buying solutions
      </p>
    </div>
  );
}
