import React from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { IBots, IState } from '../../interfaces';

const SideBar = () => {
  const { query } = useRouter();
  const botList: IBots = useSelector<IState, IBots>((state) => state.bots);

  return (
    <div className='contacts-wrap'>
      <div className='contact'>
        {Object.entries(botList).map((bot) => (
          <Link key={bot[0]} href='/[bot]' as={`/${bot[0]}`}>
            <div
              className={
                query.bot === bot[0] ? 'contact-user active' : 'contact-user'
              }
            >
              <div className='contact-user-foto'>
                <div>
                  <img src={bot[1]} alt={bot[0]} />
                </div>
              </div>
              <div className='contact-user-info'>
                <div className='contact-user-top'>
                  <span className='contact-user-name'>{bot[0]}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
