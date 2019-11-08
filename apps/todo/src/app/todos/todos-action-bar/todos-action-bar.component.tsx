/** @format */

import React, { FunctionComponent } from 'react';

export const TodosActionBar: FunctionComponent<TodosActionBarProps> = ({
  onToggleAll
}) => {
  const toggleAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onToggleAll();
  };

  return (
    <aside>
      <button type="button" onClick={toggleAll}>
        Toggle all
      </button>
    </aside>
  );
};

interface TodosActionBarProps {
  onToggleAll: () => void;
}
