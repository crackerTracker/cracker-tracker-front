import React from 'react';
import RightSideDrawer from 'components/RightSideDrawer';
import { Col, List, Row } from 'antd';
import { Flex, Header, Panel } from './CategoriesDrawer.styles';
import { useTrackerStore } from 'stores/hooks';
import Category from './Category';
import CategoryInput from './CategoryInput';
import { CategoryInputTypesEnum } from './CategoryInput/CategoryInput';

type Props = {
  visible: boolean;
  onDrawerClose: VoidFunction;
};

const CategoriesDrawer: React.FC<Props> = ({ visible, onDrawerClose }) => {
  const { activeCategories, archivedCategories } = useTrackerStore();

  return (
    <RightSideDrawer
      visible={visible}
      onDrawerClose={onDrawerClose}
      headerDate={'Ваши категории'}
    >
      <Flex>
        <Row style={{ flexGrow: 1 }}>
          <Col span={12} style={{ paddingRight: '6px' }}>
            <Panel>
              <Header>Дейстующие</Header>
              <List>
                {activeCategories.map((category) => (
                  <Category key={category.id} category={category} />
                ))}
              </List>
            </Panel>
          </Col>
          <Col span={12} style={{ paddingLeft: '6px' }}>
            <Panel>
              <Header>Архивированные</Header>
              <List>
                {archivedCategories.map((category) => (
                  <Category key={category.id} category={category} />
                ))}
              </List>
            </Panel>
          </Col>
        </Row>
        <Row style={{ flexShrink: 1 }}>
          <CategoryInput type={CategoryInputTypesEnum.editing} />
        </Row>
      </Flex>
    </RightSideDrawer>
  );
};

export default CategoriesDrawer;
