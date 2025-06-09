import HeaderType0 from './HeaderType0';
import HeaderType1 from './HeaderType1';
import HeaderType2 from './HeaderType2';
import HeaderType3 from './HeaderType3';
import HeaderType4 from './HeaderType4';
import HeaderType5 from './HeaderType5';
import HeaderType6 from './HeaderType6';
import DefaultHeader from './DefaultHeader';

type HeaderType = 'type0' | 'type1' | 'type2' | 'type3' | 'type4' | 'type5' | 'type6' | 'type7';

interface HeaderProps {
    type: HeaderType;
    title?: string;
    onComplete?: () => void;
}

const Header = ({ type, title, onComplete }: HeaderProps) => {
    switch (type) {
        case 'type0':
            return <HeaderType0 />;
        case 'type1':
            return <HeaderType1 title={title || '포토카드'} />;
        case 'type2':
            return <HeaderType2 />;
        case 'type3':
            return <HeaderType3 onComplete={onComplete} />;
        case 'type4':
            return <HeaderType4 />;
        case 'type5':
            return <HeaderType5 />;
        case 'type6':
            return <HeaderType6 />;
        default:
            return <DefaultHeader />;
    }
};

export default Header;