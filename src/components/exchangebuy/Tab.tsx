import DefaultTab from "./DefalutTab";


type TabType = 'type1' | 'type2' | 'type3';

interface TabProps {
  type: TabType;
  items: string[];
  onChange?: (index: number) => void;
}

const Tab = ({ type, items, onChange }: TabProps) => {
  // items[0]: 왼쪽 탭, items[1]: 오른쪽 탭
  return (
    <DefaultTab leftTab={items[0]} rightTab={items[1]}>
      {(activeTab) =>
        activeTab === 'left'
          ? <div>{items[0]} 탭 콘텐츠</div>
          : <div>{items[1]} 탭 콘텐츠</div>
      }
    </DefaultTab>
  );
};

export default Tab;