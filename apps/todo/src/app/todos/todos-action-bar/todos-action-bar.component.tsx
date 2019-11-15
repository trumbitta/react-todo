/** @format */

import React, { FunctionComponent } from 'react';

const TodosActionBar_: FunctionComponent<TodosActionBarProps> = ({ onToggleAll, onDeleteAll }) => {
  const toggleAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onToggleAll();
  };

  const deleteAll = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();

    onDeleteAll();
  };

  return (
    <aside>
      <button type="button" onClick={toggleAll}>
        Toggle all
      </button>

      <button type="button" onClick={deleteAll}>
        Delete all
      </button>
    </aside>
  );
};

interface TodosActionBarProps {
  onToggleAll: () => void;
  onDeleteAll: () => void;
}

export const TodosActionBar = React.memo(TodosActionBar_);
