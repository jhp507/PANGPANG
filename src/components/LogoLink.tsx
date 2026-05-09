import { Link, useLocation } from 'react-router-dom';

const LogoLink = () => {
  const location = useLocation();

  const handleClick = () => {
    if (location.pathname === '/') {
      window.location.reload();
    }
  };

  return (
    <Link to="/" onClick={handleClick} className="flex items-center gap-2 group">
      <img 
        src="/pangpang_logo.png" 
        alt="PANGPANG 로고" 
        className="w-10 h-10 object-contain rounded-full group-hover:rotate-12 transition-transform duration-300" 
      />
      <h1 className="text-2xl font-black text-penguin-yellow tracking-tighter">
        PANGPANG
      </h1>
    </Link>
  );
};

export default LogoLink;
