import HeaderType1 from './HeaderType1';
import HeaderType2 from './HeaderType2';
import HeaderType3 from './HeaderType3';
import HeaderType4 from './HeaderType4';
import HeaderType5 from './HeaderType5';
import HeaderType6 from './HeaderType6';
import DefaultHeader from './DefaultHeader';

type HeaderType = 'type1' | 'type2' | 'type3' | 'type4' | 'type5' | 'type6' | 'type7';

interface HeaderProps {
    type: HeaderType;
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ type,title }) => {
    switch (type) {
        case 'type1':
            return <HeaderType1 title={title || '필요한 제목으로 바꿔쓰시기'}/>;
        case 'type2':
            return <HeaderType2 />;
        case 'type3':
            return <HeaderType3 />;
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