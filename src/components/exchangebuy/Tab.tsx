import DefaultTab from "./DefalutTab";


type TabType = 'type1' | 'type2' | 'type3';

interface TabProps {
  type: TabType;
  items: string[];
  onChange?: (index: number) => void;
}

const Tab = ({ type, items, onChange }: TabProps) => {
  switch (type) {
            default:
            return <DefaultTab />;
  }
};

export default Tab;