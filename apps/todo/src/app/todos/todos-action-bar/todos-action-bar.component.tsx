/** @format */

import React, { FunctionComponent } from 'react';

const TodosActionBar_: FunctionComponent<TodosActionBarProps> = ({
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

export const TodosActionBar = React.memo(TodosActionBar_);
