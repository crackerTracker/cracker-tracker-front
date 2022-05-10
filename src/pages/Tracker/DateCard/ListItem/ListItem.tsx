import React, { useMemo } from 'react';
import { getMinsAndHoursStringFromMins } from 'utils/getMinsAndHoursFromMins';
import { CategoryType } from 'stores/TrackerStore/types';
import { Color, Content, StyledListItem } from './ListItem.styles';

type Props = {
  category: CategoryType;
  minutesSpent: number;
};

const ListItem: React.FC<Props> = ({ category, minutesSpent }) => {
  const { name, color } = category;

  const timeSpent = useMemo(
    () => getMinsAndHoursStringFromMins(minutesSpent),
    [minutesSpent]
  );

  return (
    <StyledListItem extra={<div>{timeSpent}</div>}>
      <Content>
        <Color color={color} />
        {name}
      </Content>
    </StyledListItem>
  );
};

export default ListItem;
