// drawer (left -> navbar -> right) -> modal (background -> container) -> message -> dropdown/picker

const zIndexes = {
  modalContainer: 1005,
  modalBackground: 1001,
  rightDrawer: 1000,
  navbar: 900,
  leftDrawer: 800,
};

export const antZIndexes = {
  picker: 1050, // .ant-picker-dropdown
  dropdown: 1050, // .ant-dropdown
  message: 1010, // .ant-message
  modalMask: 1000, // .ant-modal-mask
  modal: 1000, // .ant-modal-wrap
  drawer: 1000, // .ant-drawer
};

export default zIndexes;
