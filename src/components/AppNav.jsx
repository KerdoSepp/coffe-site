import { NavLink } from 'react-router-dom';

import bagIcon from '../assets/figma/nav-bag.svg';
import homeIcon from '../assets/figma/nav-home.svg';
import notificationIcon from '../assets/figma/nav-notification.svg';
import useCart from '../hooks/useCart.js';

const tabs = [
  { label: 'Home', to: '/', icon: homeIcon },
  { label: 'Order', to: '/order', icon: bagIcon },
  { label: 'Delivery', to: '/delivery', icon: notificationIcon },
];

export default function AppNav() {
  const { quantity } = useCart();

  return (
    <nav
      aria-label="Coffee app pages"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-elevated bg-surface/95 px-3 pt-2 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-xl md:top-1/2 md:right-6 md:bottom-auto md:left-auto md:w-32 md:-translate-y-1/2 md:rounded-2xl md:border"
    >
      <div className="mx-auto flex max-w-[430px] items-center justify-around gap-1 md:flex-col md:items-stretch md:gap-2">
        {tabs.map((tab) => (
          <NavLink
            key={tab.to}
            to={tab.to}
            end={tab.to === '/'}
            aria-label={tab.label}
            className={({ isActive }) =>
              `group flex min-w-14 flex-col items-center gap-1.5 rounded-xl px-2 py-1.5 text-[10px] font-semibold transition md:min-w-0 md:flex-row md:justify-start md:px-3 md:py-2.5 md:text-xs ${isActive ? 'text-accent md:bg-elevated' : 'text-secondary hover:bg-elevated/70 hover:text-white'}`
            }
          >
            {({ isActive }) => (
              <>
                <span className="relative shrink-0">
                  <img
                    src={tab.icon}
                    alt=""
                    className={`size-5 object-contain ${isActive ? 'nav-icon-active' : 'nav-icon-idle'}`}
                  />
                  {tab.to === '/order' && quantity > 0 && (
                    <span className="absolute -top-2 -right-2 grid size-4 place-items-center rounded-full bg-accent text-[9px] leading-none font-semibold text-white">
                      {quantity}
                    </span>
                  )}
                </span>
                <span className="hidden md:inline">{tab.label}</span>
                <span
                  aria-hidden="true"
                  className={`h-1 w-2.5 rounded-full bg-accent transition md:hidden ${isActive ? 'opacity-100' : 'opacity-0'}`}
                />
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
