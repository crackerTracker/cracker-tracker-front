import React, { useState } from 'react';
import RightSideDrawer from 'components/RightSideDrawer';
import { Col, Row } from 'antd';
import {
  Container,
  Flex,
  Header,
  ListsWrapper,
  Panel,
  StyledList,
} from './CategoriesDrawer.styles';
import { useTrackerStore } from 'stores/hooks';
import Category from './Category';
import CategoryInput from './CategoryInput';
import { CategoryType } from 'stores/TrackerStore/types';
import { observer } from 'mobx-react-lite';

type Props = {
  visible: boolean;
  onDrawerClose: VoidFunction;
};

const CategoriesDrawer: React.FC<Props> = ({ visible, onDrawerClose }) => {
  const { activeCategories, archivedCategories } = useTrackerStore();

  const [editedCategory, setEditedCategory] = useState<CategoryType | null>(
    null
  );

  const closeDrawer = () => {
    setEditedCategory(null);
    onDrawerClose();
  };

  return (
    <>
      <RightSideDrawer
        visible={visible}
        onDrawerClose={closeDrawer}
        headerDate={'Ваши категории'}
      >
        <Container>
          <Flex>
            <ListsWrapper>
              <Col span={12} style={{ paddingRight: '6px', maxHeight: '100%' }}>
                <Panel>
                  <Header>Дейстующие</Header>
                  <StyledList>
                    {activeCategories.map((category) => (
                      <Category
                        key={category.id}
                        category={category}
                        isEdited={
                          !!editedCategory && editedCategory.id === category.id
                        }
                        setEditedCategory={setEditedCategory}
                      />
                    ))}
                  </StyledList>
                </Panel>
              </Col>
              <Col span={12} style={{ paddingLeft: '6px', maxHeight: '100%' }}>
                <Panel>
                  <Header>Архивированные</Header>
                  <StyledList>
                    {archivedCategories.map((category) => (
                      <Category
                        key={category.id}
                        category={category}
                        isEdited={
                          !!editedCategory && editedCategory.id === category.id
                        }
                        setEditedCategory={setEditedCategory}
                      />
                    ))}
                  </StyledList>
                </Panel>
              </Col>
            </ListsWrapper>
            <Row>
              <CategoryInput
                editedCategory={editedCategory}
                setEditedCategory={setEditedCategory}
                isDrawerVisible={visible}
              />
            </Row>
          </Flex>
        </Container>
      </RightSideDrawer>
    </>
  );
};

export default observer(CategoriesDrawer);
