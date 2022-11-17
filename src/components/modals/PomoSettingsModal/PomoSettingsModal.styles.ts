import styled from 'styled-components';
import { InputNumber } from 'antd';
import { flex } from 'styles/mixins';
import colors from 'styles/colors';

export const SettingsItem = styled.div`
  margin-bottom: 16px;
  padding: 15px;

  ${flex({ justify: 'space-between', align: 'center' })}

  font-size: 20px;
  background-color: ${colors.lightBrown};
  border-radius: 8px;
`;

export const StyledInputNumber = styled(InputNumber)`
  width: 90px;
  font-size: 20px;
` as typeof InputNumber;
