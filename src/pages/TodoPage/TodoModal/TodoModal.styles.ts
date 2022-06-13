import styled from 'styled-components';
import colors from 'styles/colors';
import { scroller } from 'styles/mixins';
import { Modal } from 'antd';

export const StyledModal = styled(Modal)`
  .ant-modal-content {
    padding: 35px;

    background-color: ${colors.peach};
    border-radius: 16px;
  }

  .ant-modal-footer {
    border-top: none;
  }
`;

export const ModalHeader = styled.header`
  margin-bottom: 35px;
`;

export const ModalContent = styled.div`
  max-height: 40vh;

  overflow: auto;
  ${scroller}
`;
