import styled, { css } from 'styled-components';
import colors from 'styles/colors';
import { animate, square } from 'styles/mixins';
import { Input } from 'antd';

export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 60px;
  margin-top: 25px;
`;

export const Subtrate = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  ${square('100%')};

  background-color: ${colors.lightBrown};
  opacity: 0.5;
  border-radius: 8px;
`;

export const Content = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  ${square('100%')};
  padding: 7px;

  display: flex;
  align-items: center;
`;

export const StyledInput = styled(Input).attrs({
  size: 'large',
})`
  flex-shrink: 1;

  border-radius: 8px;
  border-color: transparent;
  background-color: ${colors.white};
  opacity: 0.8;

  &.ant-input:focus,
  &.ant-input-focused,
  &.ant-input:hover {
    opacity: 1;
    border-color: transparent;
    box-shadow: none;
  }
` as typeof Input;

export const ButtonWrapper = styled.div<{
  withoutOpacityChange?: boolean;
  isDisabled?: boolean;
}>`
  position: relative;
  margin-left: 8px;

  ${({ withoutOpacityChange, isDisabled }) =>
    !withoutOpacityChange &&
    !isDisabled &&
    css`
      opacity: 0.8;

      ${animate('opacity')};

      &:hover {
        opacity: 1;
      }
    `}
`;

export const Color = styled.div.attrs<{ color: string }>(({ color }) => ({
  style: {
    backgroundColor: color,
  },
}))`
  ${square('100%')};
  border-radius: 4px;
`;

export const ColorPickerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  transform: translate3d(calc(-100% + 40px), calc(-100% - 20px), 0);
`;
