import styled from 'styled-components';
import { Card } from 'antd';
import { transparentColors } from 'styles/colors';
import { animate } from 'styles/mixins';

export const StyledCard = styled(Card)`
  border-radius: 8px;

  // .ant-card-head {
  //   ${animate('background-color')};
  //   &:hover {
  //     cursor: pointer;
  //     background-color: ${transparentColors.blueHover};
  //   }
  // }
`;
