import React, { useState } from 'react';

const Tabs = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState('display');

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div>
      <div className="tabs-list  ">
        {React.Children.map(children, (child) => {
          if (child.type === TabsTrigger) {
            return React.cloneElement(child, {
              isActive: child.props.value === selectedTab,
              onClick: () => handleTabClick(child.props.value),
            });
          }
          return null;
        })}
      </div>
      <div className="tabs-content m-4 p-2">
        {React.Children.map(children, (child) => {
          if (child.type === TabContent && child.props.value === selectedTab) {
            return child;
          }
          return null;
        })}
      </div>
    </div>
  );
};

export const TabsTrigger = ({ value, onClick, isActive }) => (
  <button
    className={`tab-trigger ${isActive ? 'active' : ''} mx-8 text-center font-bold p-1 radius-md flex-1 bg-blue-500 text-white`}
    onClick={onClick}
  >
    {value}
  </button>
);

export const TabContent = ({ value, children }) => (
  <div className="tab-content" value={value}>
    {children}
  </div>
);

export default Tabs;
